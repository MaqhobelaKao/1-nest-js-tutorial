import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';
import authConfig from '../config/auth.config';
import type { ConfigType } from '@nestjs/config';


@Injectable()
export class AuthorizeGuard  implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
    ) {}
  async canActivate(context: ExecutionContext):  Promise<boolean>  {
   // Extract the request object from the execution context
    const request = context.switchToHttp().getRequest();

   // Extract the token from the request headers
   const authorizationHeader = request.headers['authorization']
   if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }
    const token = authorizationHeader.split(' ')[1];
    

   // Validate the token (implementation omitted for brevity)
    if (!token) {
      return false;
    }
    // Here you would typically verify the token using a JWT service or similar
    try {
        await this.jwtService.verifyAsync(token);
    } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }
}