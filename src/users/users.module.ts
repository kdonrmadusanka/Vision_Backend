import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController], // All controllers in this module
  providers: [UsersService], // All services/providers in this module
  exports: [UsersService], // Makes UsersService available to other modules
})
export class UsersModule {}
