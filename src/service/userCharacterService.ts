import CharacterModel from '../model/characterModel';
import CharacterService from './characterService';
import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import IUserCharacterSlot from '../interface/userCharacterSlotInterface';
import UserCharacterModel from '../model/userCharacterModel';
import UserService from './userService';
import { Sequelize } from 'sequelize';

export default class UserCharacterService {
  public static async save(
    userId: string,
    characterId: string,
    slot?: number
  ): Promise<HandlerSuccess> {
    await UserService.get(userId);
    const character = await CharacterService.getCharacterById(characterId);
    await this.existUserCharacterByUserId(userId, characterId);
    await UserCharacterModel.create({
      userId: userId,
      characterId: characterId,
      minHp: character.hp,
      slot: slot,
    });
    return new HandlerSuccess('Personagem do usuário criado com sucesso', 201);
  }

  public static async getAll(userId: string): Promise<UserCharacterModel[]> {
    return await UserCharacterModel.findAll({
      where: {
        userId: userId,
      },
      order: [
        ['slot', 'ASC'],
        ['id', 'DESC'],
      ],
      attributes: [
        'id',
        'experience',
        'level',
        'upgrade',
        'minHp',
        [
          Sequelize.literal('COALESCE(min_hp, 0) * COALESCE(level, 0)'),
          'maxHp',
        ],
        'slot',
        'userId',
        'characterId',
        [Sequelize.col('created_at'), 'createdAt'],
        [Sequelize.col('updated_at'), 'updatedAt'],
      ],
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
      ],
    });
  }

  public static async get(
    id: string,
    userId: string
  ): Promise<UserCharacterModel> {
    const exist = await UserCharacterModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      attributes: [
        'id',
        'experience',
        'level',
        'upgrade',
        'minHp',
        [
          Sequelize.literal('COALESCE(min_hp, 0) * COALESCE(level, 0)'),
          'maxHp',
        ],
        'slot',
        'userId',
        'characterId',
        [Sequelize.col('created_at'), 'createdAt'],
        [Sequelize.col('updated_at'), 'updatedAt'],
      ],
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
    return exist;
  }

  public static async existUserCharacterByUserId(
    userId: string,
    characterId: string
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
      await this.updateSlot(userCharacterSlot.userId, i.characterId, i.slot);
    }
    return new HandlerSuccess('Slot do personagem atualizado com sucesso.');
  }

  private static async clearSlot(userId: string): Promise<void> {
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
    userId: string,
    characterId: string,
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
