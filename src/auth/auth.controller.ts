import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService, 
    ) {}

    @Post('login')
    login(@Body() user: LoginDto) {
        return this.authService.logIn(user);
    }

    @Post('signup')
    signup(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }
}
