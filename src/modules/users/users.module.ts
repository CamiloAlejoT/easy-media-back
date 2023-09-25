import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { EntitiesModule } from 'src/entities/entities.module'

@Module({
  imports: [EntitiesModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
