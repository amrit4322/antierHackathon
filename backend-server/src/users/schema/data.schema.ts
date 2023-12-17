import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';



@Schema()
export class Data {
  @Prop({type:mongoose.Schema.Types.Mixed})
  data: Record<string, any>;
}

export const DataSchema = SchemaFactory.createForClass(Data) ;

