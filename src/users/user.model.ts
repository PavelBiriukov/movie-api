import { Schema, Document, model } from 'mongoose';

export interface UserModel extends Document {
    username: string;
    password: string;
    email: string;
    id: string; 
    // Add any additional properties if necessary
  }
  

const UserSchema = new Schema<UserModel>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  // Определите дополнительные поля, если необходимо
});

export const UserModel = model<UserModel>('User', UserSchema);
