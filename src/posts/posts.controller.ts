import { Controller,Get, Post, Put, Patch, Delete, Body, Param, Query} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { GetPostsDto } from './dto/get-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}
    @ApiOperation({
        summary:'Get All Users and their posts',
        description: 'One User can have many posts'
})
    @Get()
    @ApiQuery({
        name:'page',
        required: false,
        example:1
    })
    findAll(@Query() postQuery: GetPostsDto){
        return this.postsService.findAll(postQuery)
    }


    @Get('/:userId')
    findOne(@Param('userId') userId: string, @Query() postQuery: GetPostsDto)
    {
        return this.postsService.findOne(Number(userId), postQuery)

    }

    @Post()
    create(@Body()  createPostDto: CreatePostDto){
        return this.postsService.create(createPostDto)
    }
    @Put(':id')
    update(
        @Param('id') id: string, 
        @Body() updatePostDto: UpdatePostDto){
       return this.postsService.update(Number(id), updatePostDto)
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.postsService.remove(Number(id))
    }

}
