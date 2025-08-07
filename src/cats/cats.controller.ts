// src/cats/cats.controller.ts
import { Controller, Get, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { MESSAGES } from 'src/common/constants';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() cat: Cat) {
    try{
      return await this.catsService.create(cat);
    }
    catch{
      throw new InternalServerErrorException(MESSAGES.CAT.CREATE_FAIL);
    }
  }

  @Get()
  async findAll() {
    try {
       return await this.catsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.CAT.FETCH_FAIL)
    }
   
  }
}
