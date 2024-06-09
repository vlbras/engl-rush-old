import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateUserDto, DeleteUserDto, UpdateUserDto } from '../dto';
import { User } from '../models';
import { UserCommandTopics } from '../topics';

@Injectable()
export class UserCommandTransporter {
  public constructor(
    @Inject(SERVICES.USER)
    private readonly broker: ClientProxy,
  ) {}

  public async create(payload: CreateUserDto): Promise<User> {
    return lastValueFrom(this.broker.send(UserCommandTopics.Create, payload));
  }

  public async updateOne(payload: UpdateUserDto): Promise<User> {
    return lastValueFrom(this.broker.send(UserCommandTopics.UpdateOne, payload));
  }

  public async deleteOne(payload: DeleteUserDto): Promise<void> {
    await this.broker.send(UserCommandTopics.DeleteOne, payload).toPromise();
  }
}
