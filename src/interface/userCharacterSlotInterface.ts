export default interface IUserCharacterSlot {
  userId: number;
  characters: ICharacterSlot[];
}

export interface ICharacterSlot {
  characterId: number;
  slot: number;
}
