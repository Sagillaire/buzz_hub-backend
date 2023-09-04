import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { User, UserDocument } from 'src/auth/schema/auth.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    try {
      const findAll = await this.userModel.find().select('-password');
      return { count: findAll.length, results: findAll };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.userModel.findById(id);
      if (!findOne)
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      return findOne;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    try {
      const findOne = await this.userModel.findById(id);
      if (!findOne)
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      const passwordHash = await hash(password, 8);
      updateUserDto = { ...updateUserDto, password: passwordHash };
      const update = await this.userModel.updateOne({ _id: id }, updateUserDto);
      return update;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
