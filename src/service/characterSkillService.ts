import CharacterSkillModel from '../model/characterSkillModel';
import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import SkillModel from '../model/skillModel';
import SKillService from './skillService';
import UserCharacterService from './userCharacterService';

export default class CharacterSkillService {
  public static async save(
    userId: string,
    userCharacterId: string,
    skillId: string
  ): Promise<HandlerSuccess> {
    await UserCharacterService.get(userCharacterId, userId);
    await SKillService.getSkillById(skillId);
    await this.existCharacterSkillBySkillId(userCharacterId, skillId);
    await CharacterSkillModel.create({
      userCharacterId: userCharacterId,
      skillId: skillId,
    });
    return new HandlerSuccess(
      'Habilidade do personagem criado com sucesso',
      201
    );
  }

  public static async getAll(
    userId: string,
    userCharacterId: string
  ): Promise<CharacterSkillModel[]> {
    await UserCharacterService.get(userCharacterId, userId);
    return await CharacterSkillModel.findAll({
      where: {
        userCharacterId: userCharacterId,
      },
      order: [['id', 'DESC']],
      include: [
        {
          model: SkillModel,
          as: 'skill',
        },
      ],
    });
  }

  public static async get(
    userId: string,
    userCharacterId: string
  ): Promise<CharacterSkillModel> {
    await UserCharacterService.get(userCharacterId, userId);
    const exist = await CharacterSkillModel.findOne({
      where: {
        userCharacterId: userCharacterId,
      },
      include: [
        {
          model: SkillModel,
          as: 'skill',
        },
      ],
    });
    if (!exist) {
      throw new HandlerError('Habilidade do personagem não encontrado', 404);
    }
    return exist;
  }

  public static async existCharacterSkillBySkillId(
    userCharacterId: string,
    skillId: string
  ): Promise<void> {
    const count = await CharacterSkillModel.count({
      where: {
        userCharacterId: userCharacterId,
        skillId: skillId,
      },
    });
    if (count) {
      throw new HandlerError(
        'Já existe a habilidade no personagem do usuário',
        400
      );
    }
  }
}
