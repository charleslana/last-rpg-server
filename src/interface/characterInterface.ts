import CharacterClassEnum from '../enum/characterClassEnum';
import RarityEnum from '../enum/rarityEnum';

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
