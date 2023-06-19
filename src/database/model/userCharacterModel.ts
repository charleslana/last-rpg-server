import { CharacterModel } from './characterModel';
import { database } from '../database';
import { DataTypes } from 'sequelize';
import { UserModel } from './userModel';

export const UserCharacterModel = database.define(
  'tb_user_character',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    experience: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    upgrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slot: {
      type: DataTypes.INTEGER,
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
    characterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: CharacterModel,
        key: 'id',
      },
      field: 'character_id',
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserCharacterModel.belongsTo(CharacterModel, {
  as: 'character',
  foreignKey: 'characterId',
  targetKey: 'id',
});
