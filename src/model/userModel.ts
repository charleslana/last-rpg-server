import UserRoleModel from './userRoleModel';
import { DataTypes, HasManyGetAssociationsMixin, Model } from 'sequelize';
import { sequelize } from './sequelize';

export default class UserModel extends Model {
  public id!: string;
  public authToken!: string | null;
  public email!: string;
  public password!: string;
  public name!: string | null;
  public banned!: Date | null;
  public gold!: string;
  public shard!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly roles!: UserRoleModel[];
  public getRoles!: HasManyGetAssociationsMixin<UserRoleModel>;
}

UserModel.init(
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
    sequelize,
    tableName: 'tb_user',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserModel.hasMany(UserRoleModel, { as: 'roles', foreignKey: 'userId' });
