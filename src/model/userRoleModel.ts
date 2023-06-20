import UserModel from './userModel';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

export default class UserRoleModel extends Model {
  public id!: string;
  public name!: string;
  public userId!: string;
}

UserRoleModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: 'tb_user_role',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
