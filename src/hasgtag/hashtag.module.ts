import { Module } from '@nestjs/common';
import { HasgtagController } from './hashtag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTag } from './hashtag.entity';
import { HashtagService } from './hashtag.service';

@Module({
  controllers: [HasgtagController],
  providers: [HashtagService],
  exports: [HashtagService],
  imports: [TypeOrmModule.forFeature([HashTag])],
})
export class HasgtagModule {

}
