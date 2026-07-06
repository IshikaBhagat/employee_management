import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

@Injectable()
export class PaginationProvider {
 public async paginateQuery(
    paginationQuery: PaginationQueryDto,
    model: any,
    options: any = {},
  ) {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 10;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      model.findMany({
        ...options,
        skip,
        take: limit,
      }),
      model.count({
        where: options.where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}