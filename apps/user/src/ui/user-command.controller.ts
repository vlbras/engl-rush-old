import { CreateUserDto, DeleteUserDto, UpdateUserDto, User, UserCommandTopics } from '@common/user';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserCommand, DeleteUserCommand, UpdateUserCommand, UserCommandFacade } from '#user/application/commands';

@Controller()
export class UserCommandController {
  public constructor(private readonly userFacade: UserCommandFacade) {}

  @MessagePattern(UserCommandTopics.Create)
  public async create(@Payload() payload: CreateUserDto): Promise<User> {
    const command = new CreateUserCommand(payload);
    return this.userFacade.create(command);
  }

  @MessagePattern(UserCommandTopics.UpdateOne)
  public async updateOne(@Payload() payload: UpdateUserDto): Promise<User> {
    const command = new UpdateUserCommand(payload);
    return this.userFacade.updateOne(command);
  }

  @MessagePattern(UserCommandTopics.DeleteOne)
  public async deleteOne(@Payload() payload: DeleteUserDto): Promise<void> {
    const command = new DeleteUserCommand(payload);
    await this.userFacade.deleteOne(command);
  }
}
