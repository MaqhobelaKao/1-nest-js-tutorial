import { BadRequestException, HttpException, HttpStatus, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import { UserAlreadyExistException } from 'src/custom-exceptions/user-already-exist';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginatited } from 'src/common/pagination/paginated.interface';
import { UserNotFoundException } from 'src/custom-exceptions/user-not-found';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    private readonly paginationProvider: PaginationProvider
  ) {}

  async getUsers(paginationQueryDto: PaginationDto): Promise<Paginatited<User>> {
    try {
      return await this.paginationProvider.paginateQuery<User>(
        paginationQueryDto,
        this.userRepository,
      );
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
      const userExistWithUsername = await this.userRepository.findOneBy({
        username: userDto.username,
      });

      if(userExistWithUsername) {
        throw new UserAlreadyExistException('username', userDto.username);
      }

      const userExistWithEmail = await this.userRepository.findOneBy({
        email: userDto.email,
      });

      if (userExistWithEmail) {
        throw new UserAlreadyExistException('email', userDto.email);
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

  public async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if(user) {
        return user;
      }
      else
        throw new RequestTimeoutException('User with the given email not found');
    } catch (error) {
      throw error;
    }
  }
}
