import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({where: {id}});
  }

  public async createUser(user: CreateUserDto){
    // validate if the user exist with the same email
    const userRecord = await this.userRepository.findOne({where: {email: user.email}})

    // handle the error
    if(userRecord) {
      throw new Error('User with the same email already exists');
    }

    // inset the user into the database
    return await this.userRepository.save(user);
  }
}
