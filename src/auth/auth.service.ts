import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as config from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersService } from 'src/users/user.service';
import { log } from 'console';

@Injectable()
export class AuthService {
  IsAuthenticated: boolean = false;

  constructor(
    @Inject(forwardRef(()=> UsersService)) 
    private readonly userService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: config.ConfigType<typeof authConfig>,
  ) {}

 
  logIn(email: string, password: string) {
    log('Shared Secret:', this.authConfiguration.sharedSecret);
  }

  isLoggedIn() {
    return this.IsAuthenticated;
  }
}
