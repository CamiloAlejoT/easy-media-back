import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/interfaces/user.interface'


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async getUserNadPayLoad(email: string): Promise<{ user: User, payload: any }> {
        const user: User = await this.usersService.findOne(email);
        if (user){
            const payload = { sub: user.uuid, username: user.email };
            return { user, payload }
        } else {
            throw new UnauthorizedException();
        }

    }

    async login(email: string, password: string): Promise<any> {
        const { user, payload } = await this.getUserNadPayLoad(email)
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        this.usersService.toggleUserStatus(user.uuid, user.isActive)
        return {
            role: user.name,
            email: user.email,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async logOut(uuid: string): Promise<any> {
        await this.usersService.toggleUserStatus(uuid, true)
        return HttpStatus.OK
    }

    async signIn(email: string, password: string, name: string): Promise<any> {
        const user: User = await this.usersService.findOne(email);
        if (user) {
            throw new HttpException(`The email ${email} is alredy used`, HttpStatus.BAD_REQUEST)
        } else {
            const newUser = await this.usersService.create(email, password, name)
            return newUser
        }
    }

    async renew(email: string) {
        const { user, payload } = await this.getUserNadPayLoad(email)
        return {
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            access_token: await this.jwtService.signAsync(payload),
        };

    }
}
