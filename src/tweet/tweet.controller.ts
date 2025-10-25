import { Controller, Param, ParseIntPipe, Get } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweets')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    // localhost:3000/tweet/1
    @Get(':userId')
    public getTweets(@Param('userId', ParseIntPipe) userid: number) {
        return this.tweetService.getAllTweetsByUserId(userid);
    }
}
