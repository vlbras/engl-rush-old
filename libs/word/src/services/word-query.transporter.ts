import { SERVICES } from '@common/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { FindWordDto, TranslateWordDto } from '../dto';
import { Word } from '../models';
import { WordQueryTopics } from '../topics';

@Injectable()
export class WordQueryTransporter {
  public constructor(
    @Inject(SERVICES.WORD)
    private readonly broker: ClientProxy,
  ) {}

  public async findOne(payload: FindWordDto): Promise<Word> {
    return lastValueFrom(this.broker.send(WordQueryTopics.FindOne, payload));
  }

  public async findMany(): Promise<Word[]> {
    return lastValueFrom(this.broker.send(WordQueryTopics.FindMany, {}));
  }

  public translateOne(payload: TranslateWordDto): Promise<string> {
    return lastValueFrom(this.broker.send(WordQueryTopics.TranslateOne, payload));
  }
}
