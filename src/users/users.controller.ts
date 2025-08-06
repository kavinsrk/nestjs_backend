import { Controller, Post ,Body,Get} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService) {}

    @Post()
    create(@Body() body :Partial<User>){
        return this.usersService.create(body)   
    }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }
    
}
