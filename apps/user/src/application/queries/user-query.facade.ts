import { User } from '@common/user';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserQuery, FindUsersQuery, UserExistsQuery } from '.';

@Injectable()
export class UserQueryFacade {
  public constructor(private readonly queryBus: QueryBus) {}

  public async findMany(query: FindUsersQuery): Promise<User[]> {
    return this.queryBus.execute(query);
  }

  public async findOne(query: FindUserQuery): Promise<User> {
    return this.queryBus.execute(query);
  }

  public async exists(query: UserExistsQuery): Promise<boolean> {
    return this.queryBus.execute(query);
  }
}
