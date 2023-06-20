import CharacterModel from '../model/characterModel';
import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import sequelize, { Optional } from 'sequelize';

export default class CharacterService {
  public static async save(model: CharacterModel): Promise<HandlerSuccess> {
    const count = await CharacterModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', model.name)
      ),
    });
    if (count) {
      throw new HandlerError('Nome já cadastrado.');
    }
    await CharacterModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Personagem criado com sucesso.', 201);
  }

  public static async get(id: string): Promise<CharacterModel> {
    return await this.getCharacterById(id);
  }

  public static async getAll(): Promise<CharacterModel[]> {
    return await CharacterModel.findAll();
  }

  public static async update(model: CharacterModel): Promise<HandlerSuccess> {
    await this.getCharacterById(model.id);
    const exist = await CharacterModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', model.name)
      ),
    });
    if (
      exist &&
      exist.name?.toLowerCase() === model.name?.toLowerCase() &&
      exist.id != model.id
    ) {
      throw new HandlerError('Nome do personagem já existe', 400);
    }
    await CharacterModel.update(model as Optional<unknown, never>, {
      where: {
        id: model.id,
      },
    });
    return new HandlerSuccess('Personagem atualizado com sucesso');
  }

  public static async delete(id: string): Promise<HandlerSuccess> {
    await this.getCharacterById(id);
    await CharacterModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Personagem excluído com sucesso');
  }

  public static async getCharacterById(id: string): Promise<CharacterModel> {
    const exist = await CharacterModel.findOne({
      where: {
        id: id,
      },
    });
    if (!exist) {
      throw new HandlerError('Personagem não encontrado', 404);
    }
    return exist;
  }
}
