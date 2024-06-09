import { User } from '@common/user';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from './update-user.command';

import { UserCommandRepository } from '#user/infrastructure/repositories/';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, User> {
  public constructor(private readonly userRepository: UserCommandRepository) {}

  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  public async execute(command: UpdateUserCommand): Promise<User> {
    const { id, ...data } = command.input;
    this.logger.debug(`Start updating user ${JSON.stringify(command.input)}`);

    const user = await this.userRepository.updateOne({ _id: id }, data);

    this.logger.debug(`User successfully updated ${JSON.stringify(user)}`);
    return user;
  }
}
