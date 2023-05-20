import { DataTypes } from "sequelize";
import { database } from "../database";
import { UserModel } from "./user.model";

export const UserRoleModel = database.define('tb_user_role', {
    id: {
        type: DataTypes.BIGINT, autoIncrement: true, allowNull: false, primaryKey: true,
    }, name: {
        type: DataTypes.STRING, allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: UserModel,
            key: 'id',
        },
        field: 'user_id',
    },
}, {
    freezeTableName: true, createdAt: 'created_at', updatedAt: 'updated_at',
});