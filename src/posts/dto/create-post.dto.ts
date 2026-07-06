import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator"

export class CreatePostDto{
    @ApiProperty({
        example:'Posted By Ishika Bhagat',
        description:'Learning Swagger Api documentation'
    })
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: number
}