import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as config from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersService } from 'src/users/user.service';
import { log } from 'console';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';

@Injectable()
export class AuthService {
  IsAuthenticated: boolean = false;

  constructor(
    private readonly userService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: config.ConfigType<typeof authConfig>,
    private readonly hashingProvider: BcryptProvider,
  ) {}

 
  async logIn(email: string, password: string) {
    log('Shared Secret:', this.authConfiguration.sharedSecret);
  }

  public async signUp(user: CreateUserDto) {
    // create the user
    return await this.userService.createUser({
      ...user,
      password: await this.hashingProvider.hashPassword(
        user.password,
      )
    });
  }
    

  async isLoggedIn() {
    return this.IsAuthenticated;
  }


}
