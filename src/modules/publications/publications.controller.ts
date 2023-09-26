import {
    Controller,
    Get,
    Body,
    Post,
    ValidationPipe,
    Param,
    Query
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from 'src/core/dtos/publication.dto';

@Controller('publications')
export class PublicationsController {
    constructor(
        private publicationsService: PublicationsService
    ) { }


    @Post('create')
    create(
        @Body(ValidationPipe) data: CreatePublicationDto
    ) {
        return this.publicationsService.create(data)
    }

    @Get('offset')
    getPublications(
        @Query('offset') offset?: number,
    ) {
        return this.publicationsService.getWithOffset(offset)
    }

    @Get('filter')
    filterPublications(
        @Query("isActive") isActive?: boolean,
        @Query("findUser") findUser?: string,
        @Query("title") title?: string,
        @Query("creationDate") creationDate?: string,
    ) {
        return this.publicationsService.filterPublications(title, creationDate, findUser, isActive)
    }







}
