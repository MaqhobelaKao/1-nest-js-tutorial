import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";
import { CreateProfileDto } from "src/profile/dto/create-profile.dto";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, {message: 'Email should not exceed 100 characters'})
    email: string;

    @IsString({message: 'Username must be a string'})
    @MaxLength(24, {message: 'Username should not exceed 24 characters'})
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6, {message: 'Password should have at least 6 characters'})
    @IsString({message: 'Password must be a string'})
    @MaxLength(100, {message: 'Password should not exceed 100 characters'})
    password: string;

    @IsOptional()
    profile: CreateProfileDto | null;
}