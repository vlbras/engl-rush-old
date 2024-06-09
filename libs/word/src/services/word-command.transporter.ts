import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateWordDto, DeleteWordDto, UpdateWordDto } from '../dto';
import { Word } from '../models';
import { WordCommandTopics } from '../topics';

@Injectable()
export class WordCommandTransporter {
  public constructor(
    @Inject(SERVICES.WORD)
    private readonly broker: ClientProxy,
  ) {}

  public async create(payload: CreateWordDto): Promise<Word> {
    return lastValueFrom(this.broker.send(WordCommandTopics.Create, payload));
  }

  public async updateOne(payload: UpdateWordDto): Promise<Word> {
    return lastValueFrom(this.broker.send(WordCommandTopics.UpdateOne, payload));
  }

  public async deleteOne(payload: DeleteWordDto): Promise<void> {
    await this.broker.send(WordCommandTopics.DeleteOne, payload).toPromise();
  }
}
