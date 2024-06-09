import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UserDeletedEvent } from '../dto';
import { UserEventTopics } from '../topics';

@Injectable()
export class UserEventTransporter {
  public constructor(
    @Inject(SERVICES.FOLDER)
    private readonly folderService: ClientProxy,
  ) {}

  public async userDeleted(payload: UserDeletedEvent): Promise<void> {
    this.folderService.emit(UserEventTopics.UserDeleted, payload).toPromise();
  }
}
