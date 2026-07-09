import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostfilterProvider } from './providers/postfilter.provider';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
    private readonly postfilter: PostfilterProvider,
  ) {}

  async findAll(postQuery: GetPostsDto) {
    const options = this.postfilter.buildQuery(postQuery);
    return this.paginationProvider.paginateQuery(
      postQuery,
      this.prisma.post,
      options,
    );
  }

  async findOne(userId: number, postQuery: GetPostsDto) {
    const skip = (postQuery.page - 1) * postQuery.limit;
    // return this.prisma.post.findMany({
    //     where:
    //     {
    //         userId: userId
    //     },
    //     skip,
    //     take: postQuery.limit,
    // });

    return this.paginationProvider.paginateQuery(postQuery, this.prisma.post, {
      where: {
        userId,
      },
    });
  }

  async create(post: CreatePostDto) {
    return this.prisma.post.create({
      data: post,
    });
  }

  async update(id: number, post: UpdatePostDto) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: post,
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
