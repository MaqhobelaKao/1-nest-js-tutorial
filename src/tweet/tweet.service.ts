import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
    
    constructor(
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>,
        private readonly usersService: UsersService,
    ) {}


    public async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
        const user = await this.usersService.getUserById(createTweetDto.userId);

        if(!user) {
            throw new Error('User not found');
        }
        
        const tweet = this.tweetRepository.create({ 
            ...createTweetDto,
            user: user,
        });
        return this.tweetRepository.save(tweet);
    }

    public async getTweets(): Promise<Tweet[]> {
        return this.tweetRepository.find({
            relations: {
                user: true,
            },
        });
    }


    public async getTweetsById(id: number): Promise<Tweet[]> {
        return this.tweetRepository.find({
            where: {id: id},
            relations: {
                user: true,
            },
        })
    }

    public async getTweetsByUserId(userId: number): Promise<Tweet[]> {
        return this.tweetRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                user: false,
            },
        });
    }
}
