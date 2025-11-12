import { Controller, Param, ParseIntPipe, Get, Body, Post, Patch, Delete, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTweetQueryDto } from './dto/get-tweet-dto';
import { log } from 'console';

@Controller('tweets')
export class TweetController {
    constructor(private tweetService: TweetService) {}


    @Get()
    public getAllTweets( @Query() getTweetsQueryDtop: GetTweetQueryDto ,) {
    
        return this.tweetService.getTweets(getTweetsQueryDtop);
    }

    // localhost:3000/tweet/1
    @Get(':id')
    public getTweetsById(
        @Param('id', ParseIntPipe) userid: number,
        @Query() paginationQueryDto: PaginationDto ,
    ) {
        return this.tweetService.getTweetsById(userid, paginationQueryDto);
    }

    @Post()
    public createTweet(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetService.createTweet(createTweetDto);
    }

    @Get(':userId/tweets')
    public getTweetsForUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.tweetService.getTweetsByUserId(userId);
    }

    @Patch()
    public updateTweet(@Body() updateTweenDto: UpdateTweetDto) {
        return this.tweetService.updateTweet(updateTweenDto);
    }
    
    @Delete(':id')
    public deleteTweet(@Param('id', ParseIntPipe) tweetId: number) {
        return this.tweetService.deleteTweet(tweetId);
    }
}
