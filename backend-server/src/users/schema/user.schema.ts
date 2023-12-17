import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class User {
  @Prop({default:"UnNamed"})
  name: string;

  @Prop({default:"Img"})
  profileImg:string;

  @Prop({unique:true})
  publicID:string;

  @Prop({default:[]})
  purchased :string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create a unique index on the publicID field
UserSchema.index({ publicID: 1 }, { unique: true });

// Error handling for unique constraint violations
UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    // Handle the duplicate key error (unique constraint violation) for publicID
    next(new Error('PublicID must be unique.'));
  } else {
    next(error);
  }
});