import { Body, Controller, Get, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag-dto';

@Controller('hashtag')
export class HasgtagController {
    constructor(private readonly hashTagService: HashtagService) { }

    @Post()
    async getHashTags(@Body() body: CreateHashtagDto ) {
        return this.hashTagService.create(body);
    }

    @Get()
    async fetchHashtags() {
        return this.hashTagService.getHashtags();
    }
}
