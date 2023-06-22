import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import sequelize, { Optional } from 'sequelize';
import SkillModel from '../model/skillModel';

export default class SKillService {
  public static async save(model: SkillModel): Promise<HandlerSuccess> {
    const count = await SkillModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', model.name)
      ),
    });
    if (count) {
      throw new HandlerError('Nome já cadastrado.');
    }
    await SkillModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Habilidade criada com sucesso.', 201);
  }

  public static async get(id: string): Promise<SkillModel> {
    return await this.getSkillById(id);
  }

  public static async getAll(): Promise<SkillModel[]> {
    return await SkillModel.findAll();
  }

  public static async update(model: SkillModel): Promise<HandlerSuccess> {
    await this.getSkillById(model.id);
    const exist = await SkillModel.findOne({
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
      throw new HandlerError('Nome da habilidade já existe', 400);
    }
    await SkillModel.update(model as Optional<unknown, never>, {
      where: {
        id: model.id,
      },
    });
    return new HandlerSuccess('Habilidade atualizada com sucesso');
  }

  public static async delete(id: string): Promise<HandlerSuccess> {
    await this.getSkillById(id);
    await SkillModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Habilidade excluída com sucesso');
  }

  public static async getSkillById(id: string): Promise<SkillModel> {
    const exist = await SkillModel.findOne({
      where: {
        id: id,
      },
    });
    if (!exist) {
      throw new HandlerError('Habilidade não encontrada', 404);
    }
    return exist;
  }
}
