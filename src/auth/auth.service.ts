import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  IsAuthenticated: boolean = false;

  constructor(
    @Inject(forwardRef(()=> UsersService)) private readonly userService: UsersService,
  ) {}

 
  logIn(email: string, password: string) {
    const user = this.userService.getUsers().then(
      (user) => user.find(u => u.email === email && u.password === password),
    );
    if (user != undefined) {
      this.IsAuthenticated = true;
      return { message: 'Login successful', token: 'TOKEN' };
    } else {
      return { message: 'Invalid email or password' };
    }
  }

  isLoggedIn() {
    return this.IsAuthenticated;
  }
}
