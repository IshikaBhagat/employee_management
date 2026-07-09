import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional()
  limit: number = 10;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional()
  page: number = 1;
}
