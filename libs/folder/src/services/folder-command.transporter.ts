import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateFolderDto, DeleteFolderDto, UpdateFolderDto } from '../dto';
import { Folder } from '../models';
import { FolderCommandTopics } from '../topics';

@Injectable()
export class FolderCommandTransporter {
  public constructor(
    @Inject(SERVICES.FOLDER)
    private readonly broker: ClientProxy,
  ) {}

  public async create(payload: CreateFolderDto): Promise<Folder> {
    return lastValueFrom(this.broker.send(FolderCommandTopics.Create, payload));
  }

  public async updateOne(payload: UpdateFolderDto): Promise<Folder> {
    return lastValueFrom(this.broker.send(FolderCommandTopics.UpdateOne, payload));
  }

  public async deleteOne(payload: DeleteFolderDto): Promise<void> {
    await this.broker.send(FolderCommandTopics.DeleteOne, payload).toPromise();
  }
}
