import { ClientProxy } from '@nestjs/microservices';
import {
  Post,
  Body,
  Logger,
  Inject,
  Controller,
} from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('BROKER')
    private readonly broker: ClientProxy,
    private readonly logger: Logger
  ) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    try {
      this.logger.log('Received request for user creation', JSON.stringify(userData));
      return this.broker.send('create_user', userData);
    } catch (error) {
      this.logger.error(`Request for creating user failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}
