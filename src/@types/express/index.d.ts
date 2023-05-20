declare namespace Express {
    import IUserRole from "../../interface/user.role.interface";

    export interface Request {
        user: {
            id: number; roles: IUserRole[];
        };
    }
}