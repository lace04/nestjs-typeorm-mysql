import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private _postService: PostsService) {}

  @Post()
  cretaePost(@Body() post: CreatePostDto) {
    return this._postService.createPost(post);
  }

  @Get()
  getPosts() {
    return this._postService.getPosts();
  }
}
