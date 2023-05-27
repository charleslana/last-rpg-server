import CharacterClassEnum from "../enum/character.class.enum";
import RarityEnum from "../enum/rarity.enum";

export default interface ICharacter {
    id: number;
    name: string;
    characterClass: CharacterClassEnum;
    hp: number;
    furyHit: number;
    furyDefense: number;
    attack: number | null;
    magicAttack: number | null;
    defense: number | null;
    magicDefense: number | null;
    agility: number;
    critical: number | null;
    dodge: number | null;
    rarity: RarityEnum;
}