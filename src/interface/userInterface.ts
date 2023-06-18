import IUserRole from './userRoleInterface';

export default interface IUser {
  id: number;
  authToken: string | null;
  email: string;
  password: string;
  name: string | null;
  banned: Date | null;
  gold: number;
  credit: number;
  roles: IUserRole[];
}
