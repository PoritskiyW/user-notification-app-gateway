import { ClientProxy } from '@nestjs/microservices';
import {
  Post,
  Body,
  Inject,
  Controller,
} from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('BROKER')
    private readonly broker: ClientProxy,
  ) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return this.broker.send('create_user', userData);
  }
}
