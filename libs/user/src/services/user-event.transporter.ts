import { Injectable } from '@nestjs/common';

import { UserDeletedEvent } from '../dto';

@Injectable()
export class UserEventTransporter {
  public constructor() {}

  public async userDeleted(payload: UserDeletedEvent): Promise<void> {}
}
