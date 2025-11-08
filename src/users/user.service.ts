import { BadRequestException, HttpException, HttpStatus, Injectable, RequestTimeoutException } from '@nestjs/common';
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


  public async createUser(userDto: CreateUserDto) {
    try {
      // Create profile if provided
      const existingUser = await this.userRepository.findOne({
        where: [{ username: userDto.username }, { email: userDto.email }],
      });

      if (existingUser) {
        throw new BadRequestException(
          'There is already value for username or email',
          {
            description: 'Duplicate Value',
          },
        );
      }

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
      }

      throw error;
    }
  }

  public async findUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });

      if (!user) {
        throw new HttpException({
          status: 404,
          error: 'User not found',
        }, HttpStatus.NOT_FOUND,{
          description: `No user with the given ${id} exists`,
        });
      }
      return this.userRepository.findOneBy({ id: id });
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
