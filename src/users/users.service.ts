import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { profile } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
    @InjectRepository(Profile) private _profileRepository: Repository<Profile>,
  ) {}

  getUsers() {
    return this._userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this._userRepository.findOne({
      where: { id },

      relations: ['posts', 'profile'],
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async createUser(user: CreateUserDto) {
    const userFound = await this._userRepository.findOne({
      where: { username: user.username },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = this._userRepository.create(user);
    return this._userRepository.save(newUser);
  }

  async deleteUser(id: number) {
    const result = await this._userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this._userRepository.findOne({ where: { id } });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // return this._userRepository.update({ id }, user);
    const updateUser = Object.assign(userFound, user);
    return this._userRepository.save(updateUser);
  }

  //Profile

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this._userRepository.findOne({ where: { id } });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this._profileRepository.create(profile);
    const savedProfile = await this._profileRepository.save(newProfile);

    userFound.profile = savedProfile;
    return this._userRepository.save(userFound);
  }
}
