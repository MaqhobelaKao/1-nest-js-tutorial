import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { HasgtagModule } from 'src/hasgtag/hashtag.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService],
  imports: [UserModule, TypeOrmModule.forFeature([Tweet]), HasgtagModule],
})
export class TweetModule {}
