import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private _postRepository: Repository<Post>,
    private _usersService: UsersService,
  ) {}

  async createPost(post: CreatePostDto) {
    const userFound = await this._usersService.getUser(post.authorId);

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this._postRepository.create(post);
    return this._postRepository.save(newPost);
  }

  getPosts() {
    return this._postRepository.find({
      relations: ['author'],
    });
  }
}
