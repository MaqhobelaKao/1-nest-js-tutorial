import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { HashTag } from './hashtag.entity';
import { CreateHashtagDto } from './dto/create-hashtag-dto';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(HashTag) 
        private readonly hashtagRepository: Repository<HashTag>,
    ) {}

    async create(createHashtagDto: CreateHashtagDto): Promise<HashTag> {
        const hashtag = this.hashtagRepository.create( createHashtagDto );
        return await this.hashtagRepository.save(hashtag);
    }

    async getHashtags( ): Promise<HashTag[]> {
        return await this.hashtagRepository.find();
    }


    async findHashtags(hastags: number[]) : Promise<HashTag[]> {
       return await this.hashtagRepository.find({
            where: {
                id: In(hastags),
            },
        })
    }
}
