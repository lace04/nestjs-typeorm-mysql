import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Put,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this._userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this._userService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this._userService.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this._userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this._userService.updateUser(id, user);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this._userService.createProfile(id, profile);
  }
}
