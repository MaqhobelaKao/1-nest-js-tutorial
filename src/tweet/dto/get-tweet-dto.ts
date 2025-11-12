import { IntersectionType } from "@nestjs/mapped-types";
import { IsDate, IsOptional } from "class-validator";
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';

class GetTweetDto {
    @IsOptional()
    @IsDate()
    startdate?: Date;

    @IsOptional()
    @IsDate()
    enddate?: Date;
}


export class GetTweetQueryDto extends IntersectionType(
    GetTweetDto,
    PaginationDto
){
    
}