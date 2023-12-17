import { Transform,TransformFnParams } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional() // Indicate that the field is optional
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly publicID: string;

  @IsOptional() // Indicate that the field is optional
  @IsString()
  profileImg: string;

  @IsOptional() // Indicate that the field is optional
  @IsArray()
  purchased: string[];
}
