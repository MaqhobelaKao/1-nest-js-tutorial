import { IsIn, IsInt, IsNotEmpty, IsOptional } from "class-validator";


export class CreateTweetDto {
    @IsNotEmpty({ message: "Tweed text cannot be empty" })
    text: string;

    @IsOptional()
    imageUrl?: string;

    @IsNotEmpty({ message: "User ID is required" })
    @IsInt({ message: "User ID must be a number" })
    userId: number;

}