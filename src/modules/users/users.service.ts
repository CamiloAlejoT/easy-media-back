import { Injectable } from '@nestjs/common';
import { User } from 'src/core/interfaces/user.interface'
import { v4 as uuidv4 } from 'uuid';
import { EntitiesService } from 'src/entities/entities.service'


@Injectable()
export class UsersService {

    constructor(
        private entitiesService: EntitiesService
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        const user: User = await this.entitiesService.findUserByEmail(email)
        return user
    }

    async create(email: string, password: string, name: string): Promise<User> {
        const newUser: User = { email, name, password, uuid: uuidv4(), isActive: false }
        const newUSer = await this.entitiesService.createUser(newUser)
        return newUSer
    }

    async toggleUserStatus(uuid: string, status: boolean) {
        return await this.entitiesService.setUsetActive(uuid, !status)
    }


}