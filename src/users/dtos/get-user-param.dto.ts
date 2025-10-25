// src/users/dto/get-user-param.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class GetUserParamDto {
  
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isMarried?: boolean;
}