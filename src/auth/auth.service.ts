import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersService } from 'src/users/user.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { BcryptProvider } from './provider/bcrypt.provider';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { audit } from 'rxjs';

@Injectable()
export class AuthService {
  IsAuthenticated: boolean = false;

  constructor(
    private readonly userService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: config.ConfigType<typeof authConfig>,
    private readonly hashingProvider: BcryptProvider,
    private readonly jwtservice: JwtService,
  ) {}

  async logIn(userDto: LoginDto) {
    const user = await this.userService.findByEmail(userDto.email);

    const isPasswordValid = await this.hashingProvider.comparePassword(
      userDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.IsAuthenticated = false;
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate and return a token (implementation omitted for brevity)
    const token = await this.jwtservice.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );

    this.IsAuthenticated = true;
    return { message: 'Login successful', user: {
      id: user.id,
      email: user.email,
      token: token,
      role: user.profile
    } };
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
