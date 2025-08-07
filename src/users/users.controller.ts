import { Controller, Post, Body, Get, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { MESSAGES } from 'src/common/constants';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() body: Partial<User>) {
        try {
            return await this.usersService.create(body)
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.USER.CREATE_FAIL);
        }

    }

    @Get()
    async findAll() {
        try {
            return await this.usersService.findAll();

        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.USER.FETCH_FAIL)
        }
    }
}
