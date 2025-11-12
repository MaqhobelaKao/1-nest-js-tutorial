import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
    public async paginateQuery<T extends ObjectLiteral>(
        PaginationDto: PaginationDto,
        repository: Repository<T>,
        where? : FindOptionsWhere<T>
    ){
       const findOptions: FindManyOptions<T> = {
        skip: (PaginationDto.page! - 1) * PaginationDto.limit!,
        take: PaginationDto.limit,
       }

       if(where){
         findOptions.where = where;
       }

        return await repository.find(findOptions); 
    }
        
}
