export default interface IUserCharacterSlot {
  userId: string;
  characters: ICharacterSlot[];
}

export interface ICharacterSlot {
  characterId: string;
  slot: number;
}
