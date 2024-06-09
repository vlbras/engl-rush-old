import { ApiUserModule } from '@common/user';
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [ApiUserModule, UserModule],
})
export class GatewayModule {}
