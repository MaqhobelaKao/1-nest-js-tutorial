import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { HashTag } from './hashtag.entity';
import { CreateHashtagDto } from './dto/create-hashtag-dto';
import { log } from 'console';

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

    public async deleteHashtag(id: number) {

        // Delete the hashtag with the given id
        const result = await this.hashtagRepository.delete({id});
        log(result);
        return { 
            deleted: true, 
            id: id, 
            message: 'Hashtag deleted successfully' 
        };
    }

    public async softDeleteHashtag(id: number) {
        // Soft delete the hashtag with the given id
        const result = await this.hashtagRepository.softDelete({id});
        log(result);
        return { 
            deleted: true, 
            id: id, 
            message: 'Hashtag soft deleted successfully' 
        };
    }
}
