// src/cats/cats.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { MESSAGES } from 'src/common/constants';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

  async create(cat: Cat): Promise<Cat> {
    try {
      const newCat = new this.catModel(cat);
      return await newCat.save();
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.CAT.CREATE_FAIL);
    }

  }

  async findAll(): Promise<Cat[]> {
    try {
      return await this.catModel.find().exec();
    }
    catch (error) {
      throw new InternalServerErrorException(MESSAGES.CAT.FETCH_FAIL);
    }
  }
}
