import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({where: {id}});
  }

  public async createUser(userDto: CreateUserDto){
    // Create profile if provided


    // create user object
    const user = this.userRepository.create({
      email: userDto.email,
      username: userDto.username,
      password: userDto.password,
      profile: userDto.profile ? this.profileRepository.create(userDto.profile) : {},
    });
    // save user to database
    return await this.userRepository.save(user);
  }
}
