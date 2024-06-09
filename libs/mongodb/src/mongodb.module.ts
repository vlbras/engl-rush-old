import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb/engl-rush')],
})
export class MongoDBModule {
  public static forFeature(models?: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}
