import { Controller, Post, Body, Get, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() body: Partial<User>) {
        try {
            return await this.usersService.create(body)
        } catch (error) {
            throw new InternalServerErrorException("failed to create user");
        }

    }

    @Get()
    async findAll() {
        try {
            return await this.usersService.findAll();

        } catch (error) {
            throw new InternalServerErrorException("failed to get all user details")
        }
    }
}
