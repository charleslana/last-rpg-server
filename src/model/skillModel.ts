import CharacterClassEnum from '../enum/characterClassEnum';
import SkillTypeEnum from '../enum/skillTypeEnum';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

export default class SkillModel extends Model {
  public id!: string;
  public name!: string;
  public characterClass!: CharacterClassEnum;
  public type!: SkillTypeEnum;
}

SkillModel.init(
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
      unique: true,
    },
    characterClass: {
      type: DataTypes.ENUM(...Object.values(CharacterClassEnum)),
      allowNull: false,
      field: 'character_class',
    },
    type: {
      type: DataTypes.ENUM(...Object.values(SkillTypeEnum)),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tb_skill',
    freezeTableName: true,
    timestamps: false,
  }
);
