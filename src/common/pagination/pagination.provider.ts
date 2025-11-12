import { Injectable, Inject } from '@nestjs/common';
import {REQUEST } from '@nestjs/core';
import { log } from 'console';
import express from 'express';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';
import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { Paginatited } from './paginated.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST) private readonly request: express.Request
    ){}


    public async paginateQuery<T extends ObjectLiteral>(
        PaginationDto: PaginationDto,
        repository: Repository<T>,
        where? : FindOptionsWhere<T>

    ): Promise<Paginatited<T>>{

       const findOptions: FindManyOptions<T> = {
        skip: (PaginationDto.page! - 1) * PaginationDto.limit!,
        take: PaginationDto.limit,
       }

       if(where){
         findOptions.where = where;
       }
        const result  =  await repository.find(findOptions); 

        const totalItems = await repository.count({where});
        const totalPages = Math.ceil(totalItems / PaginationDto.limit!);
        const baseUrl = `${this.request.protocol}://${this.request.get('host')}`;
        const newUrl = new URL(this.request.originalUrl, baseUrl);
        const fullUrl = newUrl.origin + newUrl.pathname;

        return {
            data: result,
            meta: {
                totalItems: totalItems,
                itemCount: result.length,
                itemsPerPage: PaginationDto.limit!,
                totalPages: totalPages,
                currentPage: PaginationDto.page!,
            },
            links: {
                first: `${fullUrl}?limit=${PaginationDto.limit}&page=1`,
                previous: PaginationDto.page! > 1 ? `${fullUrl}?limit=${PaginationDto.limit}&page=${PaginationDto.page! - 1}` : null,
                next: PaginationDto.page! < totalPages ? `${fullUrl}?limit=${PaginationDto.limit}&page=${PaginationDto.page! + 1}` : null,
                last: `${fullUrl}?limit=${PaginationDto.limit}&page=${totalPages}`,
            },
        };
    }
        
}
