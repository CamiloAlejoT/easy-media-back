import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constants'
import { EntitiesService } from 'src/entities/entities.service'
import { User } from 'src/core/interfaces/user.interface'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private entitiesService: EntitiesService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    login(@Body() signInDto: Record<string, any>) {
        return this.authService.login(signInDto.username, signInDto.password);
    }

    @Public()
    @Post('signin')
    signin(@Body() {email, password, name}: Record<string, any>) {
        return this.authService.signIn(email, password, name);
    }



    @Get('profile')
    async getProfile(@Request() req) {
        const readUser = await this.entitiesService.findAll()
        return {
            user: req.user,
            createdUr: readUser
        };
    }
}
