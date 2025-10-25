import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
   users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    isMarried: boolean;
    password: string;
  }[] = [
    {
      id: 1,
      name: 'Kao',
      age: 23,
      gender: 'f',
      isMarried: true,
      password: '12345',
      email: 'kao@company.com'
    },
    {
      id: 2,
      name: 'Lereko',
      age: 12,
      gender: 'M',
      email: "lereko@company.com",
      isMarried: false,
      password: '12345',
    },
  ];

  constructor(
    @Inject(forwardRef(()=> AuthService)) private readonly authService: AuthService
  ) {}

  getUsers() {
    if(!this.authService.isLoggedIn()){
      throw new Error('User not authenticated');
    }
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    isMarried: boolean;
    password: string;
  }) {
    this.users.push(user);
  }
}
