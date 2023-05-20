import IUserRole from "./user.role.interface";

export default interface IUser {
    id: number;
    authToken: string | null;
    email: string;
    password: string;
    name: string;
    banned: Date | null;
    gold: number;
    credit: number;
    roles: IUserRole[];
}