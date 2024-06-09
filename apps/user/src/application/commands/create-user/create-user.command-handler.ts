import { User } from '@common/user';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';

import { UserCommandRepository } from '#user/infrastructure/repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, User> {
  public constructor(private readonly userRepository: UserCommandRepository) {}

  private readonly logger = new Logger(CreateUserCommandHandler.name);

  public async execute(command: CreateUserCommand): Promise<User> {
    this.logger.debug(`Start creating user ${JSON.stringify(command.input)}`);

    const user = await this.userRepository.create(command.input);

    this.logger.debug(`User successfully created ${JSON.stringify(user)}`);
    return user;
  }
}
