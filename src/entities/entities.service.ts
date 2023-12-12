import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity'
import { PublicationEntity } from './entities/publication.entity'
import { Repository } from 'typeorm';

@Injectable()
export class EntitiesService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(PublicationEntity)
        private publicationRepository: Repository<PublicationEntity>,
    ) { }


    // user	
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async setUsetActive(uuid: string, status: boolean): Promise<any> {
        return await this.userRepository.update({ uuid: uuid }, { isActive: status })
    }

    async createUser(entity: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(entity);
    }

    // publications
    async getWithOffset(query: string) {
        return await this.publicationRepository.query(query)
    }

    async getPublicationsWithFilter(query: string) {
        return await this.publicationRepository.query(query)
    }


    async createPublication(entity: PublicationEntity) {
        return await this.publicationRepository.save(entity)
    }


}
