import { ApiFolderModule } from '@common/folder';
import { ApiUserModule } from '@common/user';
import { Module } from '@nestjs/common';

import { FolderModule } from './folder/folder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ApiUserModule, UserModule, ApiFolderModule, FolderModule],
})
export class GatewayModule {}
