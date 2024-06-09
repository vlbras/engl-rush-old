import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserExistsQuery } from './user-exists.query';

import { UserQueryRepository } from '#user/infrastructure/repositories';

@QueryHandler(UserExistsQuery)
export class UserExistsQueryHandler implements IQueryHandler<UserExistsQuery, boolean> {
  public constructor(private readonly userRepository: UserQueryRepository) {}

  public async execute(query: UserExistsQuery): Promise<boolean> {
    return this.userRepository.checkIfExists({ _id: query.input.id });
  }
}
