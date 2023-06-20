import CharacterClassEnum from '../enum/characterClassEnum';
import RarityEnum from '../enum/rarityEnum';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

export default class CharacterModel extends Model {
  public id!: string;
  public name!: string;
  public characterClass!: CharacterClassEnum;
  public hp!: number;
  public furyHit!: number;
  public furyDefense!: number;
  public attack!: number | null;
  public magicAttack!: number | null;
  public defense!: number | null;
  public magicDefense!: number | null;
  public agility!: number;
  public critical!: number | null;
  public dodge!: number | null;
  public rarity!: RarityEnum;
}

CharacterModel.init(
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
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    furyHit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'fury_hit',
    },
    furyDefense: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'fury_defense',
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    magicAttack: {
      type: DataTypes.INTEGER,
      field: 'magic_attack',
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    magicDefense: {
      type: DataTypes.INTEGER,
      field: 'magic_defense',
    },
    agility: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    critical: {
      type: DataTypes.FLOAT,
    },
    dodge: {
      type: DataTypes.FLOAT,
    },
    rarity: {
      type: DataTypes.ENUM(...Object.values(RarityEnum)),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tb_character',
    freezeTableName: true,
    timestamps: false,
  }
);
