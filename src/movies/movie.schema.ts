import { Schema, Document } from 'mongoose';

export const MovieSchema = new Schema({
  title: String,
  description: String,
});

export interface Movie extends Document {
  id: string;
  title: string;
  description: string;
}
