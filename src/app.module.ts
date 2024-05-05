import { Logger, Module } from '@nestjs/common';
import {
  Transport,
  ClientsModule,
} from '@nestjs/microservices';

import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BROKER',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT) || 6379,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [Logger],
})
export class AppModule {}
