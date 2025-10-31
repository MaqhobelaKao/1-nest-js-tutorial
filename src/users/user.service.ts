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
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({where: {id}});
  }

  public async createUser(userDto: CreateUserDto){
    // Create profile if provided
    userDto.profile = userDto.profile ?? {};
    let profile  =  this.profileRepository.create(userDto.profile);
    await this.profileRepository.save(profile);
    
    // create user object
    let user = this.userRepository.create({
      ...userDto,
      profile: userDto.profile,
    });
    // save user to database
    return await this.userRepository.save(user);
  }
}
