import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/core/interfaces/user.interface'

@Entity()
export class UserEntity implements User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    password: string;
}