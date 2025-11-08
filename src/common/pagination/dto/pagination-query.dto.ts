import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    readonly page?: number = 1;

    @IsOptional()
    @IsPositive()
    readonly limit?: number = 10;
} 