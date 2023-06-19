import CharacterService from './characterService';
import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import IUserCharacter from '../interface/userCharacterInterface';
import IUserCharacterSlot from '../interface/userCharacterSlotInterface';
import UserService from './userService';
import { CharacterModel } from '../database/model/characterModel';
import { UserCharacterModel } from '../database/model/userCharacterModel';

export default class UserCharacterService {
  public static async save(
    userId: number,
    characterId: number
  ): Promise<HandlerSuccess> {
    await UserService.get(userId);
    const character = await CharacterService.getCharacterById(characterId);
    await this.existUserCharacterByUserId(userId, characterId);
    await UserCharacterModel.create({
      userId: userId,
      characterId: characterId,
      hp: character.hp,
    });
    return new HandlerSuccess('Personagem do usuário criado com sucesso', 201);
  }

  public static async getAll(userId: number): Promise<IUserCharacter[]> {
    return (await UserCharacterModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
      ],
    })) as unknown as IUserCharacter[];
  }

  public static async get(id: number, userId: number): Promise<IUserCharacter> {
    const exist = await UserCharacterModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
      ],
    });
    if (!exist) {
      throw new HandlerError('Personagem do usuário não encontrado', 404);
    }
    return exist as unknown as IUserCharacter;
  }

  public static async existUserCharacterByUserId(
    userId?: number,
    characterId?: number
  ): Promise<void> {
    const count = await UserCharacterModel.count({
      where: {
        userId: userId,
        characterId: characterId,
      },
    });
    if (count) {
      throw new HandlerError('Já existe o personagem na conta do usuário', 400);
    }
  }

  public static async updateAllSlot(
    userCharacterSlot: IUserCharacterSlot
  ): Promise<HandlerSuccess> {
    await UserService.get(userCharacterSlot.userId);
    await this.clearSlot(userCharacterSlot.userId);
    for (const i of userCharacterSlot.characters) {
      await UserCharacterService.updateSlot(
        userCharacterSlot.userId,
        i.characterId,
        i.slot
      );
    }
    return new HandlerSuccess('Slot do personagem atualizado com sucesso.');
  }

  private static async clearSlot(userId: number): Promise<void> {
    await UserCharacterModel.update(
      {
        slot: null,
      },
      {
        where: {
          user_id: userId,
        },
      }
    );
  }

  private static async updateSlot(
    userId: number,
    characterId: number,
    slot: number
  ): Promise<void> {
    const userCharacter = await this.get(characterId, userId);
    await UserCharacterModel.update(
      {
        slot: slot,
      },
      {
        where: {
          id: userCharacter.id,
        },
      }
    );
  }
}
