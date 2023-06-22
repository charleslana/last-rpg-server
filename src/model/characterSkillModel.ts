import SkillModel from './skillModel';
import UserCharacterModel from './userCharacterModel';
import { DataTypes, HasOneGetAssociationMixin, Model } from 'sequelize';
import { sequelize } from './sequelize';

export default class CharacterSkillModel extends Model {
  public id!: string;
  public level!: number;
  public userCharacterId!: string;
  public skillId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly skill!: SkillModel;
  public getSkill!: HasOneGetAssociationMixin<SkillModel>;
}

CharacterSkillModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userCharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserCharacterModel,
        key: 'id',
      },
      field: 'user_character_id',
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: SkillModel,
        key: 'id',
      },
      field: 'skill_id',
    },
  },
  {
    sequelize,
    tableName: 'tb_character_skill',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

CharacterSkillModel.belongsTo(SkillModel, {
  as: 'skill',
  foreignKey: 'skillId',
});
