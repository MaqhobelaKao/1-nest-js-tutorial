import { IsArray, IsInt, IsNotEmpty, IsOptional } from "class-validator";


export class CreateTweetDto {
    @IsNotEmpty({ message: "Tweed text cannot be empty" })
    text: string;

    @IsOptional()
    imageUrl?: string;

    @IsOptional()
    @IsInt({ each: true, message: "Each hashtag ID must be a number" })
    @IsArray({ message: "Hashtag IDs must be an array of numbers" })
    hashtags?: number[];

}