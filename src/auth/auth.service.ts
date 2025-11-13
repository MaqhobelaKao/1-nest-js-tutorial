import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as config from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersService } from 'src/users/user.service';
import { log } from 'console';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { LoginDto } from './dto/login-dto';
import { UserNotFoundException } from 'src/custom-exceptions/user-not-found';

@Injectable()
export class AuthService {
  IsAuthenticated: boolean = false;

  constructor(
    private readonly userService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: config.ConfigType<typeof authConfig>,
    private readonly hashingProvider: BcryptProvider,
  ) {}

  async logIn(userDto: LoginDto) {
    try {
      const user = await this.userService.findByEmail(userDto.email);

      if (!user) {
        this.IsAuthenticated = false;
        throw new UserNotFoundException(404);
      }

      const isPasswordValid = await this.hashingProvider.comparePassword(
        userDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        this.IsAuthenticated = false;
        throw new UserNotFoundException(404)
      }

      this.IsAuthenticated = true;
      return { message: 'Login successful' };
    } catch (error) {
      throw error;
    }
  }

  public async signUp(user: CreateUserDto) {
    // create the user
    return await this.userService.createUser({
      ...user,
      password: await this.hashingProvider.hashPassword(user.password),
    });
  }

  async isLoggedIn() {
    return this.IsAuthenticated;
  }
}
