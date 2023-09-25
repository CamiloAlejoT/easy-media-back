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

    async login(email: string, password: string): Promise<any> {
        const user: User = await this.usersService.findOne(email);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.uuid, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(email: string, password: string, name: string): Promise<any> {
        const user: User = await this.usersService.findOne(email);
        if (user) {
            throw new HttpException(`The email ${email} is alredy used`, HttpStatus.UNAUTHORIZED)
        } else {
            const newUser = await this.usersService.create(email, password, name)
            return newUser
        }
    }
}
