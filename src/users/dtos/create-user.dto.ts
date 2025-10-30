import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString({message: 'First name must be a string'})
    @IsNotEmpty()
    @MinLength(3, {message: 'First name should have at least 3 characters'})
    @MaxLength(100, {message: 'First name should not exceed 50 characters'})
    firstName: string;


    @IsString({message: 'Last name must be a string'})
    @IsNotEmpty()
    @MinLength(3, {message: 'Last name should have at least 3 characters'})
    @MaxLength(100, {message: 'Last name should not exceed 50 characters'})
    lastName: string;

    @IsString({message: 'Gender must be provided as a string'})
    gender: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, {message: 'Email should not exceed 100 characters'})
    email: string;

    @IsNotEmpty()
    @MinLength(6, {message: 'Password should have at least 6 characters'})
    @IsString({message: 'Password must be a string'})
    @MaxLength(100, {message: 'Password should not exceed 100 characters'})
    password: string;
}