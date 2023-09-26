import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/entities/user.entity';
import { PublicationEntity } from 'src/entities/entities/publication.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PublicationEntity
    ]),
  ],
  providers: [EntitiesService],
  exports: [
    EntitiesService
  ]
})
export class EntitiesModule { }
