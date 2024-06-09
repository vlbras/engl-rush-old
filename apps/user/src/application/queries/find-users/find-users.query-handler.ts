import { User } from '@common/user';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUsersQuery } from './find-users.query';

import { UserQueryRepository } from '#user/infrastructure/repositories';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<FindUsersQuery, User[]> {
  public constructor(private readonly userRepository: UserQueryRepository) {}

  public async execute(query: FindUsersQuery): Promise<User[]> {
    return this.userRepository.findMany(query);
  }
}
