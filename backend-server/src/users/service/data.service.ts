

import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Data } from '../interface/data.interface';


@Injectable()
export class DataService {
  constructor(@InjectModel('Data') private  dataModel: Model<Data>
  
  ) {}

 
  async fetchData():Promise<any>{
    const findData = await this.dataModel.find();
    // const findData = 1;
    if (!findData){
      throw new NotFoundException();
    }
    return findData;
  }
}




