import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from "class-validator";

export class CreateProfileDto {
    @IsString({message: 'First name must be a string'})
    @IsOptional()
    firstName?: string;


    @IsString({message: 'Last name must be a string'})
    @IsOptional()
 
    @MaxLength(100, {message: 'Last name should not exceed 50 characters'})
    lastName?: string;

    @IsString({message: 'Gender must be provided as a string'})
    @IsOptional()
    gender?: string;

    @IsOptional()
    dateOfBirth?: Date;

    @IsString({message: 'Bio must be a string'})
    @IsOptional()
    bio?: string;

    @IsString({message: 'Profile image must be a string'})
    @IsOptional()
    profileIMage?: string;
}