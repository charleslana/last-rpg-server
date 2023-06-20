import bcrypt from 'bcrypt';
import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import IUserAuthenticate from '../interface/userAuthenticateInterface';
import jwt from 'jsonwebtoken';
import sequelize, { Optional } from 'sequelize';
import UserCharacterService from './userCharacterService';
import UserModel from '../model/userModel';
import UserRoleModel from '../model/userRoleModel';
import { formatDate, randomString } from '../utils/utils';

export default class UserService {
  public static async save(model: UserModel): Promise<HandlerSuccess> {
    const count = await UserModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('email')),
        sequelize.fn('lower', model.email)
      ),
    });
    if (count) {
      throw new HandlerError('E-mail já cadastrado.');
    }
    model.password = this.encrypt(model.password as string);
    const insert = await UserModel.create(model as Optional<unknown, never>);
    for (let index = 1; index <= 3; index++) {
      await UserCharacterService.save(insert.id, index.toString(), index);
    }
    return new HandlerSuccess('Usuário criado com sucesso.', 201);
  }

  public static async get(id: string): Promise<UserModel> {
    const find = await UserModel.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['password', 'authToken'],
      },
      include: [
        {
          model: UserRoleModel,
          as: 'roles',
        },
      ],
    });
    if (!find) {
      throw new HandlerError('Usuário não encontrado.', 404);
    }
    return find;
  }

  public static async updateName(model: UserModel): Promise<HandlerSuccess> {
    const find = await this.get(model.id);
    if (find.name != null) {
      throw new HandlerError('Você já atualizou seu nome.', 400);
    }
    const exist = await UserModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', model.name)
      ),
    });
    if (
      exist &&
      exist.name?.toLowerCase() === model.name?.toLowerCase() &&
      exist.id !== model.id
    ) {
      throw new HandlerError('Nome já cadastrado.', 400);
    }
    await UserModel.update(
      {
        name: model.name,
      },
      {
        where: {
          id: model.id,
        },
      }
    );
    return new HandlerSuccess('Nome atualizado com sucesso.');
  }

  public static async authenticate(
    email: string,
    password: string
  ): Promise<IUserAuthenticate> {
    const find = await UserModel.findOne({
      attributes: ['id', 'email', 'password', 'banned'],
      where: {
        email: email,
      },
      include: [
        {
          model: UserRoleModel,
          as: 'roles',
        },
      ],
    });
    if (!find) {
      throw new HandlerError(
        'Impossível acessar, verifique e tente novamente.',
        403
      );
    }
    if (!this.decrypt(password, find.password as string)) {
      throw new HandlerError(
        'Impossível acessar, verifique e tente novamente.',
        403
      );
    }
    if (find.banned != null && find.banned > new Date()) {
      throw new HandlerError(
        `Impossível logar, o usuário está banido até ${formatDate(
          find.banned
        )})`,
        403
      );
    }
    const userUpdated = await UserModel.update(
      {
        authToken: randomString(100),
      },
      {
        where: {
          id: find.id,
        },
        returning: true,
      }
    );
    find.authToken = userUpdated[1][0].get().authToken;
    const token = jwt.sign({ user: find }, process.env.TOKEN_SECRET as string, {
      expiresIn: '1d',
    });
    return {
      error: false,
      message: 'Autenticado com sucesso.',
      accessToken: token,
    };
  }

  public static async getAuth(
    id: string,
    authToken: string | null
  ): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        id: id,
        authToken: authToken,
      },
    });
  }

  private static encrypt(password: string): string {
    const salt = +(process.env.BCRYPT_SALT as string);
    return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
  }

  private static decrypt(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(
      `${password}${process.env.BCRYPT_PASSWORD}`,
      hashPassword
    );
  }
}
