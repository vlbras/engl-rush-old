import { UserDeletedEvent, UserEventTopics } from '@common/user';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { DeleteFoldersCommand, FolderCommandFacade } from '#folder/application/commands';

@Controller()
export class FolderEventController {
  public constructor(private readonly facade: FolderCommandFacade) {}

  @EventPattern(UserEventTopics.UserDeleted)
  public async userDeleted(@Payload() payload: UserDeletedEvent): Promise<void> {
    const command = new DeleteFoldersCommand(payload);
    await this.facade.deleteMany(command);
  }
}
