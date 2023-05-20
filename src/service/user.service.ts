import { UserModel } from "../database/model/user.model";
import HandlerError from "../handler/handler.error";
import HandlerSuccess from "../handler/handler.success";
import IUserAuthenticate from "../interface/user.authenticate.interface";
import IUser from "../interface/user.interface";
import sequelize, { Optional } from "sequelize";
import { formatDate, randomString } from "../utils/utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRoleModel } from "../database/model/user.role.model";

export default class UserService {
    public static async save(i: IUser): Promise<HandlerSuccess> {
        let count = await UserModel.count({
            where: sequelize.where(sequelize.fn("lower", sequelize.col("email")), sequelize.fn("lower", i.email)),
        });
        if (count) {
            throw new HandlerError("E-mail já cadastrado.");
        }
        count = await UserModel.count({
            where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), sequelize.fn("lower", i.name)),
        });
        if (count) {
            throw new HandlerError("Nome já cadastrado.");
        }
        i.password = this.encrypt(i.password as string);
        await UserModel.create(i as Optional<unknown, never>);
        return new HandlerSuccess("Usuário criado com sucesso.", 201);
    }

    public static async get(id: number): Promise<IUser> {
        const find = (await UserModel.findOne({
            where: {
                id: id,
            }, attributes: { exclude: ["password", "authToken"] }, include: [
                {
                    model: UserRoleModel,
                    as: 'roles',
                },
            ],
        })) as unknown as IUser;
        if (!find) {
            throw new HandlerError("Conta não encontrada.", 404);
        }
        return find;
    }

    public static async authenticate(email: string, password: string): Promise<IUserAuthenticate> {
        const find = (await UserModel.findOne({
            attributes: ["id", "email", "password", "banned"], where: {
                email: email,
            },
            include: [
                {
                    model: UserRoleModel,
                    as: 'roles',
                },
            ],
        })) as unknown as IUser;
        if (!find) {
            throw new HandlerError("Impossível acessar, verifique e tente novamente.", 403);
        }
        if (!this.decrypt(password, find.password as string)) {
            throw new HandlerError("Impossível acessar, verifique e tente novamente.", 403);
        }
        if (find.banned != null && find.banned > new Date()) {
            throw new HandlerError(`Impossível logar, o usuário está banido até ${formatDate(find.banned)})`, 403);
        }
        const userUpdated = await UserModel.update({
            authToken: randomString(100),
        }, {
            where: {
                id: find.id,
            }, returning: true,
        });
        find.authToken = userUpdated[1][0].get().authToken;
        const token = jwt.sign({ user: find }, process.env.TOKEN_SECRET as string, {
            expiresIn: "1d",
        });
        return {
            accessToken: token,
        };
    }

    public static async getAuth(id: number, authToken: string | null): Promise<IUser> {
        return (await UserModel.findOne({
            where: {
                id: id, authToken: authToken,
            },
        })) as unknown as IUser;
    }

    private static encrypt(password: string): string {
        const salt = +(process.env.BCRYPT_SALT as string);
        return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
    }

    private static decrypt(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(`${password}${process.env.BCRYPT_PASSWORD}`, hashPassword);
    }
}