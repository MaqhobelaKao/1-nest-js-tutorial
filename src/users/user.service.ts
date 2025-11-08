import { Injectable, RequestTimeoutException } from '@nestjs/common';
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

  async getUsers() {
    try {
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Request timed out, please try again later.',
        "Couldn't connect to database",
      );
      throw new RequestTimeoutException(
        'Request timed out, please try again later.',
        "Couldn't connect to database",
      );
    }
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      // Create profile if provided

      // create user object
      const user = this.userRepository.create({
        email: userDto.email,
        username: userDto.username,
        password: userDto.password,
        profile: userDto.profile
          ? this.profileRepository.create(userDto.profile)
          : {},
      });
      // save user to database
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'Request timed out, please try again later.',
          {
            description: "Couldn't connect to database",
          },
        );
      } else if (error.code === '23505') {
        throw new RequestTimeoutException(
          'There is duplicate value for username',
          {
            description: 'Duplicate Value',
          },
        );
      }
    }
  }

  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
