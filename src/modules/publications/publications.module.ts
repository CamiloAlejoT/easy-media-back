import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller'
import { PublicationsService } from './publications.service'
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
    imports: [
        EntitiesModule
    ],
    controllers: [PublicationsController],
    providers: [
        PublicationsService
    ]
})
export class PublicationsModule { }
