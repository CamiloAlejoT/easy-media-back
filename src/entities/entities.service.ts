import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm';

@Injectable()
export class EntitiesService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { email } });
      }

    async createUser(entity: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(entity);
    }


}
