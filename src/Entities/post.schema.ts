import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  user: string;

  @Prop()
  image: string;

  @Prop({ default: true })
  visibility: boolean;

  @Prop({ default: true })
  active: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
