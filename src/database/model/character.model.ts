import { DataTypes } from "sequelize";
import { database } from "../database";
import CharacterClassEnum from "../../enum/character.class.enum";
import RarityEnum from "../../enum/rarity.enum";

export const CharacterModel = database.define("tb_character", {
    id: {
        type: DataTypes.BIGINT, autoIncrement: true, allowNull: false, primaryKey: true,
    }, name: {
        type: DataTypes.STRING, allowNull: false, unique: true,
    }, characterClass: {
        type: DataTypes.ENUM(...Object.values(CharacterClassEnum)),
        allowNull: false,
        field: "character_class",
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    furyHit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "fury_hit",
    },
    furyDefense: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "fury_defense",
    },
    attack: {
        type: DataTypes.INTEGER,
    },
    magicAttack: {
        type: DataTypes.INTEGER,
        field: "magic_attack",
    },
    defense: {
        type: DataTypes.INTEGER,
    },
    magicDefense: {
        type: DataTypes.INTEGER,
        field: "magic_defense",
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
}, {
    freezeTableName: true,
    timestamps: false,
});