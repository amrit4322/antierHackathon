
import { Document } from 'mongoose';
export interface Data extends Document {
    [key: string]: any;
  }