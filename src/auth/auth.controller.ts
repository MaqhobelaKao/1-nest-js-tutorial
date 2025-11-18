import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login-dto';

import { AllowAnonymous } from './decorators/anonymous.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService, 
    ) {}

    @Post('login')
    @AllowAnonymous()
    @HttpCode(HttpStatus.OK)
    login(@Body() user: LoginDto) {
        return this.authService.logIn(user);
    }

    @Post('signup')
    @AllowAnonymous()
    signup(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body('refreshToken') refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
}
