import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { FindUserDto, UserExistsDto } from '../dto';
import { User } from '../models';
import { UserQueryTopics } from '../topics';

@Injectable()
export class UserQueryTransporter {
  public constructor(
    @Inject(SERVICES.USER)
    private readonly broker: ClientProxy,
  ) {}

  public async findOne(payload: FindUserDto): Promise<User> {
    return lastValueFrom(this.broker.send(UserQueryTopics.FindOne, payload));
  }

  public async findMany(): Promise<User[]> {
    return lastValueFrom(this.broker.send(UserQueryTopics.FindMany, {}));
  }

  public async exists(payload: UserExistsDto): Promise<boolean> {
    return lastValueFrom(this.broker.send(UserQueryTopics.Exists, payload));
  }
}
