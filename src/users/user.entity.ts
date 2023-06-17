import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
  username: any;
  id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = Document & User;
