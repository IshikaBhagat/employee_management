import { Injectable } from '@nestjs/common';
import { GetPostsDto } from '../dto/get-posts.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostfilterProvider {
  buildQuery(query: GetPostsDto) {
    const where: Prisma.PostWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          title: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          slug: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.startDate || query.endDate) {
      where.startDate = {};

      if (query.startDate) {
        where.startDate.gte = query.startDate;
      }

      if (query.endDate) {
        where.startDate.lte = query.endDate;
      }
    }
    const orderBy = query.sortBy
      ? {
          [query.sortBy]: query.order ?? 'asc',
        }
      : {
          id: 'asc',
        };
    return {
      where,
      orderBy,
    };
  }
}
