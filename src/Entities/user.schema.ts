import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  previousPasswords: string[];

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
