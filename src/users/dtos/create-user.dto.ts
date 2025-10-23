import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    id: number;
    @IsString({message: 'Name must be a string'})
    @IsNotEmpty()
    @MinLength(3, {message: 'Name should have at least 3 characters'})
    name: string;

    @IsString({message: ''})
    gender: string;

    @IsEmail()
    email: string;

    @IsOptional()
    isMarried: boolean;
}