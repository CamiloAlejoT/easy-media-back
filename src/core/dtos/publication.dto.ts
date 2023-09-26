import { IsString, IsNotEmpty, isString, MaxLength, IsBoolean, IsInt } from 'class-validator';
import { PUBLICATION } from 'src/core/enums/publication.enum'
import { maxMessageLength, maxTitleLength } from 'src/core/constants/constants'

export class CreatePublicationDto {
    @MaxLength(maxTitleLength, { message: PUBLICATION.TITLEMAXLENGHT })
    @IsString({ message: PUBLICATION.TITLEISSTRING })
    @IsNotEmpty({ message: PUBLICATION.TITLEISEMPTY })
    title: string;

    @MaxLength(maxMessageLength, { message: PUBLICATION.MESSAGEMAXLENGTH })
    @IsString({ message: PUBLICATION.MESSAGEISSTRING })
    @IsNotEmpty({ message: PUBLICATION.MESSAGEEMPTY })
    message: string;


    @IsString({ message: PUBLICATION.AUTHORISTRING })
    @IsNotEmpty({ message: PUBLICATION.AUTHORISEMPTY })
    author: string;

    creationDate: number;
    id: string;
}