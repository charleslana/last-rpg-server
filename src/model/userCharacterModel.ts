import CharacterModel from './characterModel';
import UserModel from './userModel';
import { DataTypes, HasOneGetAssociationMixin, Model } from 'sequelize';
import { sequelize } from './sequelize';

export default class UserCharacterModel extends Model {
  public id!: string;
  public experience!: string;
  public level!: number;
  public upgrade!: number;
  public minHp!: number;
  public slot!: number | null;
  public userId!: string;
  public characterId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly character!: CharacterModel;
  public getCharacter!: HasOneGetAssociationMixin<CharacterModel>;
}

UserCharacterModel.init(
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
    minHp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'min_hp',
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
    sequelize,
    tableName: 'tb_user_character',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserCharacterModel.belongsTo(CharacterModel, {
  as: 'character',
  foreignKey: 'characterId',
});
