import { BadRequestException, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { AbstractEntity } from './abstract.entity';
import { AbstractMapper } from './abstract.mapper';
import { AbstractModel } from './abstract.model';

export abstract class AbstractCommandRepository<
  TEntity extends AbstractEntity,
  TModel extends AbstractModel,
  TMapper extends AbstractMapper<TEntity, TModel>,
> {
  public constructor(
    protected readonly entity: Model<TEntity>,
    protected readonly mapper: TMapper,
  ) {}

  private readonly logger = new Logger(AbstractCommandRepository.name);

  public async create(data: Omit<TEntity, '_id'>): Promise<TModel> {
    try {
      const newEntity = await this.entity.create(data);
      return this.mapper.mapEntityToModel(newEntity);
    } catch (err) {
      if (err.code === 11000) {
        const message = `${this.entity.modelName} already exists`;
        this.logger.error(`Create: ${message}, data: ${JSON.stringify(data)}`);
        throw new ConflictException(message);
      }

      this.logger.error(err.message);
      throw err;
    }
  }

  public async updateOne(filterQuery: FilterQuery<TEntity>, data: UpdateQuery<TEntity>): Promise<TModel> {
    const errorTitle = `UpdateOne`;

    if (Object.keys(data).length === 0) {
      const message = `Data is required to update ${this.entity.modelName}`;
      this.logger.error(`${errorTitle}: ${message}, filter: ${JSON.stringify(filterQuery)}`);
      throw new BadRequestException(message);
    }

    try {
      const entity = await this.entity.findOneAndUpdate(filterQuery, data, {
        lean: true,
        new: true,
      });

      if (!entity) {
        throw new NotFoundException(`${this.entity.modelName} not found`);
      }

      return this.mapper.mapEntityToModel(entity as TEntity);
    } catch (err) {
      const input = `filter: ${JSON.stringify(filterQuery)}, data: ${JSON.stringify(data)}`;

      if (err.code === 11000) {
        const message = `${this.entity.modelName} already exists`;
        this.logger.error(`${errorTitle}: ${message}, ${input}`);
        throw new ConflictException(message);
      }

      if (err instanceof NotFoundException) {
        this.logger.error(`${errorTitle}: ${err.message}, ${input}`);
        throw err;
      }

      this.logger.error(err.message);
      throw err;
    }
  }

  public async deleteOne(filterQuery: FilterQuery<TEntity>): Promise<void> {
    const { deletedCount } = await this.entity.deleteOne(filterQuery);

    if (!deletedCount) {
      const message = `${this.entity.modelName} not found`;
      this.logger.error(`DeleteOne: ${message}, filter: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException(message);
    }
  }

  public async deleteMany(filterQuery: FilterQuery<TEntity>): Promise<number> {
    if (Object.keys(filterQuery).length === 0) {
      const message = `Filter query is required to delete ${this.entity.modelName}`;
      this.logger.error(`DeleteMany: ${message}`);
      throw new BadRequestException(message);
    }

    const { deletedCount } = await this.entity.deleteMany(filterQuery);
    return deletedCount;
  }
}
