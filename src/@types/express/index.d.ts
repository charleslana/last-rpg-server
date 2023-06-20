declare namespace Express {
  import UserRoleModel from '../../model/userRoleModel';

  export interface Request {
    user: {
      id: string;
      roles: UserRoleModel[];
    };
  }
}
