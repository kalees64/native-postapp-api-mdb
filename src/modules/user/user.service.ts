import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Entities/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUsers() {
    try {
      const users = await this.userModel.find();
      return { data: users };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException();
      }
      return { data: user };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async createUser(user: User) {
    try {
      if (Object.keys(user).length === 0) {
        throw new BadRequestException('No data to create');
      }
      const newUser = await this.userModel.insertMany([user]);
      return { data: newUser[0] };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async updateUser(id: string, user: User) {
    try {
      if (Object.keys(user).length === 0) {
        throw new BadRequestException('No data to update');
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
      });
      if (!updatedUser) {
        throw new NotFoundException();
      }
      return { data: updatedUser };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new NotFoundException();
      }
      return { data: deletedUser };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }
}
