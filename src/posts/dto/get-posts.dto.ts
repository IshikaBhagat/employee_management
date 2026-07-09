import { IsDate, IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

class GetPostsBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  order?: 'asc' | 'desc';
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
