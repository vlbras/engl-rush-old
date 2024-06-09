import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { FindFolderDto, FolderExistsDto } from '../dto';
import { Folder } from '../models';
import { FolderQueryTopics } from '../topics';

@Injectable()
export class FolderQueryTransporter {
  public constructor(
    @Inject(SERVICES.FOLDER)
    private readonly broker: ClientProxy,
  ) {}

  public async findOne(payload: FindFolderDto): Promise<Folder> {
    return lastValueFrom(this.broker.send(FolderQueryTopics.FindOne, payload));
  }

  public async findMany(): Promise<Folder[]> {
    return lastValueFrom(this.broker.send(FolderQueryTopics.FindMany, {}));
  }

  public async exists(payload: FolderExistsDto): Promise<boolean> {
    return lastValueFrom(this.broker.send(FolderQueryTopics.Exists, payload));
  }
}
