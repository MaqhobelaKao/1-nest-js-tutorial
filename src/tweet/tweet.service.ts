import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { log } from 'console';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const user = await this.usersService.findUserById(createTweetDto.userId);
    const hashtags = await this.hashtagService.findHashtags(
      createTweetDto.hashtags!,
    );

    log('hashtags are ', hashtags);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user,
      hashtags: hashtags,
    });
    return this.tweetRepository.save(tweet);
  }

  public async getTweets(paginationQueryDto: PaginationDto) {
    
    return await this.paginationProvider.paginateQuery<Tweet>(
      paginationQueryDto,
      this.tweetRepository,
    );

    
  }

  public async getTweetsById(
    id: number,
    paginationQueryDto: PaginationDto,
  ): Promise<Tweet[]> {
    return this.tweetRepository.find({
      where: { id: id },
      relations: {
        user: true,
      },
      skip: (paginationQueryDto.page! - 1) * paginationQueryDto?.limit!,
      take: paginationQueryDto.limit,
    });
  }

  public async getTweetsByUserId(userId: number): Promise<Tweet[]> {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

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

  public async updateTweet(updateTweenDto: UpdateTweetDto) {
    // find all hashtags
    const hashtags =
      updateTweenDto.hashtags!.length > 0
        ? await this.hashtagService.findHashtags(updateTweenDto.hashtags!)
        : [];

    // find the tweet by id
    const tweet = await this.tweetRepository.findOne({
      where: { id: updateTweenDto.id },
    });

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    // update the tweet
    tweet.text = updateTweenDto.text ?? tweet.text;
    tweet.imageUrl = updateTweenDto.imageUrl ?? tweet.imageUrl;
    tweet.hashtags = hashtags.length > 0 ? hashtags : tweet.hashtags;
    return this.tweetRepository.save(tweet);
  }

  public async deleteTweet(tweetId: number) {
    return await this.tweetRepository.delete({ id: tweetId });
  }
}
