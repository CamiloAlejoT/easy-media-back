import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Publication } from 'src/core/interfaces/publication.interface'

@Entity()
export class PublicationEntity implements Publication {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string

    @Column()
    message: string

    @Column()
    creationDate: number

    @Column()
    author: string
}