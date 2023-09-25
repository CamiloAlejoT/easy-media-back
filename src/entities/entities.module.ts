import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service'
import { UserEntity } from 'src/entities/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  providers: [EntitiesService],
  exports: [
    EntitiesService
  ]
})
export class EntitiesModule { }
