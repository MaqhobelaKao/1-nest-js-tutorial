import { Controller, Param, ParseIntPipe, Get, Body, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweets')
export class TweetController {
    constructor(private tweetService: TweetService) {}


    @Get()
    public getAllTweets() {
        return this.tweetService.getTweets();
    }

    // localhost:3000/tweet/1
    @Get(':id')
    public getTweetsById(@Param('id', ParseIntPipe) userid: number) {
        return this.tweetService.getTweetsById(userid);
    }

    @Post()
    public createTweet(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetService.createTweet(createTweetDto);
    }

    @Get(':userId/tweets')
    public getTweetsForUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.tweetService.getTweetsByUserId(userId);
    }
}
