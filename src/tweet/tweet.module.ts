import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService],
  imports: [UserModule, TypeOrmModule.forFeature([Tweet]), HashtagModule, PaginationModule],
})
export class TweetModule {}
