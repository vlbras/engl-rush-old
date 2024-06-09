import { Injectable } from '@nestjs/common';

import { FolderDeletedEvent } from '../dto';

@Injectable()
export class FolderEventTransporter {
  public constructor() {}

  public async folderDeleted(payload: FolderDeletedEvent): Promise<void> {}
}
