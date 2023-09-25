import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    ValidationPipe 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants'
import { EntitiesService } from 'src/entities/entities.service'
import { LoginDto, SignInDto } from 'src/core/dtos/auth.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private entitiesService: EntitiesService
    ) { }

    @Public()
    @Post('login')
    login(@Body(ValidationPipe) { email, password}: LoginDto) {
        return this.authService.login(email, password);
    }

    @Public()
    @Post('signin')
    signin(@Body(ValidationPipe) { email, password, name }: SignInDto) {
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
