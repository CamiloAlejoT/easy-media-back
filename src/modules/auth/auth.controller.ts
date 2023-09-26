import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../core/constants/constants'
import { EntitiesService } from 'src/entities/entities.service'
import { LoginDto, SignInDto, logOutDto } from 'src/core/dtos/auth.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private entitiesService: EntitiesService
    ) { }

    @Public()
    @Post('login')
    login(@Body(ValidationPipe) { email, password }: LoginDto) {
        return this.authService.login(email, password);
    }

    @Post('logout')
    logOut(@Body(ValidationPipe) {uuid}: logOutDto ) {
        return this.authService.logOut(uuid)
    }

    @Public()
    @Post('signin')
    signin(@Body(ValidationPipe) { email, password, name }: SignInDto) {
        return this.authService.signIn(email, password, name);
    }

    @Public()
    @Get('profile')
    async getProfile(@Request() req) {
        const readUser = await this.entitiesService.findAll()
        return {
            createdUr: readUser
        };
    }
}
