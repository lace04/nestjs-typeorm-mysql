import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this._userRepository.find();
  }

  getUser(id: number) {
    return this._userRepository.findOne({ where: { id } });
  }

  createUser(user: CreateUserDto) {
    const newUser = this._userRepository.create(user);
    return this._userRepository.save(newUser);
  }

  deleteUser(id: number) {
    return this._userRepository.delete({ id });
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this._userRepository.update({ id }, user);
  }
}
