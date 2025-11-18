import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersService } from 'src/users/user.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { BcryptProvider } from './provider/bcrypt.provider';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { audit } from 'rxjs';
import { User } from 'src/users/user.entity';
import { ActiveUserType } from './interfaces/active-user-type';
import { log } from 'console';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
    const tokens = await this.generateToken(user);

    this.IsAuthenticated = true;
    return { message: 'Login successful', user: {
      id: user.id,
      email: user.email,
      role: user.profile,
      ...tokens
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

  private async signToken<T>(userId: number,  expiresIn: number, payload?: T) {
    // generate refresh token
    const token = await this.jwtservice.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      }
    );

    return token;
  }

  public async generateToken(user: User){
    // generate access token
    const accessToken = await this.signToken<Partial<ActiveUserType>>(user.id, this.authConfiguration.expiresIn, { email: user.email });
   
    // generate refresh token
    const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshExpiresIn);
    
    return { 
      token: accessToken, 
      refreshToken: refreshToken
    }
  } 

   public async refreshToken(refreshToken: RefreshTokenDto) {
    try {
      // verify the refresh token
      const payload = await this.jwtservice.verifyAsync(refreshToken.refreshToken, {
        secret: this.authConfiguration.secret,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      });

      // extract user information from the token payload
      const userId = payload.sub;

      // get the user information
      const user = await this.userService.findUserById(userId);

      return await this.generateToken(user!);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

