import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  readonly publicID: string;
  profileImg:string;
  purchased: string[];
}