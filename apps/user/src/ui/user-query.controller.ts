import { UserQueryTopics, User, FindUserDto, UserExistsDto } from '@common/user';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { FindUserQuery, FindUsersQuery, UserExistsQuery, UserQueryFacade } from '#user/application/queries';

@Controller()
export class UserQueryController {
  public constructor(private readonly userFacade: UserQueryFacade) {}

  @MessagePattern(UserQueryTopics.FindMany)
  public async findMany(): Promise<User[]> {
    const query = new FindUsersQuery();
    return this.userFacade.findMany(query);
  }

  @MessagePattern(UserQueryTopics.FindOne)
  public async findOne(@Payload() payload: FindUserDto): Promise<User> {
    const query = new FindUserQuery(payload);
    return this.userFacade.findOne(query);
  }

  @MessagePattern(UserQueryTopics.Exists)
  public async exists(@Payload() payload: UserExistsDto): Promise<boolean> {
    const query = new UserExistsQuery(payload);
    return this.userFacade.exists(query);
  }
}
