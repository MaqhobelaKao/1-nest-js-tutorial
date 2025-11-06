import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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

    @Delete(':id')
     deleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashTagService.softDeleteHashtag(id);
    }
}
