import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/Entities/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPosts() {
    try {
      const posts = await this.postModel.find();
      return { data: posts };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async getPost(id: string) {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return { data: post };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async createPost(post: Post) {
    try {
      if (!post.title) {
        throw new BadRequestException();
      }

      const newPost = await this.postModel.insertMany([post]);
      return { data: newPost[0] };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async updatePost(id: string, post: Post) {
    try {
      if (Object.keys(post).length === 0) {
        throw new BadRequestException('No data to update');
      }

      const updatedPost = await this.postModel.findByIdAndUpdate(id, post, {
        new: true,
      });

      return { data: updatedPost };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }

  async deletePost(id: string) {
    try {
      const deletedPost = await this.postModel.findByIdAndDelete(id);
      return { data: deletedPost };
    } catch (error) {
      console.log('--Error : ', error.message);
      return error;
    }
  }
}
