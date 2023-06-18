import { database } from '../database';
import { DataTypes } from 'sequelize';
import { UserRoleModel } from './userRoleModel';

export const UserModel = database.define(
  'tb_user',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    authToken: {
      type: DataTypes.STRING,
      field: 'auth_token',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    banned: {
      type: DataTypes.DATE,
    },
    gold: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    shard: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserModel.hasMany(UserRoleModel, {
  as: 'roles',
  foreignKey: 'userId',
});