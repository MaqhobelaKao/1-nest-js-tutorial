import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class TweetService {
    tweets: {text: string, date: Date, userId: Number}[] = [
        {text: 'Hello World', date: new Date(), userId: 1},
        {text: 'My second tweet', date: new Date(), userId: 2},
        {text: 'NestJS is awesome!', date: new Date(), userId: 1},
        {text: 'I love programming', date: new Date(), userId: 3},
    ];

    constructor(private userService: UsersService) {}

    getAllTweetsByUserId(userId: number) {
        const user = this.userService.getUserById(userId);
        const twees = this.tweets.filter(tweet => tweet.userId === userId);

        return [];
    }
}
