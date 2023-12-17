import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interface/user.interface';



@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>
  
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found');
    }
    return userData;
  }

  async findOne(id: string): Promise<IUser> {
    const existUser = await this.userModel.findById(id);
    if (!existUser) {
      throw new NotFoundException(`User not found`);
    }
    return existUser;
  }

  async findByUserID(publicId: string): Promise<IUser> {
    console.log("ddh",publicId);
    const existUser = await this.userModel.findOne({ publicID:publicId });
    console.log("Ex",existUser);
    if (!existUser) {
      return null;
    }
    return existUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    console.log("String id ",id);
    const existUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: false },
    );
    if (!existUser) {
      throw new NotFoundException(`User  not found`);
    }
    return existUser;
  }

  async purchase(id: string, games:string[]): Promise<IUser> {
    console.log("String id ",id);
    const existUser = await this.userModel.findById(id);
    if (!existUser) {
      throw new NotFoundException(`User  not found`);
    }
    
      existUser.purchased = existUser.purchased.concat(games);
    const updatedUser = await existUser.save();
    
    console.log(updatedUser);
    return updatedUser;
  }


  async remove(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User not found`);
    }
    return true;
  }

  
}


5