import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import ICharacter from '../interface/characterInterface';
import sequelize, { Optional } from 'sequelize';
import { CharacterModel } from '../database/model/characterModel';

export default class CharacterService {
  public static async save(i: ICharacter): Promise<HandlerSuccess> {
    const count = await CharacterModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', i.name)
      ),
    });
    if (count) {
      throw new HandlerError('Nome já cadastrado.');
    }
    await CharacterModel.create(i as Optional<unknown, never>);
    return new HandlerSuccess('Personagem criado com sucesso.', 201);
  }

  public static async get(id: number): Promise<ICharacter> {
    return await this.getCharacterById(id);
  }

  public static async getAll(): Promise<ICharacter[]> {
    return (await CharacterModel.findAll()) as unknown as ICharacter[];
  }

  public static async update(i: ICharacter): Promise<HandlerSuccess> {
    await this.getCharacterById(i.id);
    const exist = (await CharacterModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', i.name)
      ),
    })) as unknown as ICharacter;
    if (
      exist &&
      exist.name?.toLowerCase() === i.name?.toLowerCase() &&
      exist.id != i.id
    ) {
      throw new HandlerError('Nome do personagem já existe', 400);
    }
    await CharacterModel.update(i as Optional<unknown, never>, {
      where: {
        id: i.id,
      },
    });
    return new HandlerSuccess('Personagem atualizado com sucesso');
  }

  public static async delete(id: number): Promise<HandlerSuccess> {
    await this.getCharacterById(id);
    await CharacterModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Personagem excluído com sucesso');
  }

  public static async getCharacterById(id: number): Promise<ICharacter> {
    const exist = (await CharacterModel.findOne({
      where: {
        id: id,
      },
    })) as unknown as ICharacter;
    if (!exist) {
      throw new HandlerError('Personagem não encontrado', 404);
    }
    return exist;
  }
}
