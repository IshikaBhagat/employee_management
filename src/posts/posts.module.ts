import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { PostfilterProvider } from './providers/postfilter.provider';

@Module({
  imports: [PaginationModule],
  controllers: [PostsController],
  providers: [PostsService, PostfilterProvider]
})
export class PostsModule {}
