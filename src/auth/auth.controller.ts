import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService, 
    ) {}

    @Post('login')
    login(@Body() user: {email: string, password: string}) {
        return this.authService.logIn(user.email, user.password);
    }

    @Post('signup')
    signup(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }
}
