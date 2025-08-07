import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { MESSAGES } from 'src/common/constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>) {}

    async create(userData: Partial<User>): Promise<User> {
        try {
            const newUser=new this.userModel(userData);
        return await newUser.save();
        } catch (error) {
            throw new InternalServerErrorException("failed to create new user")
        }
        
    }

    async findAll() : Promise<User[]>{
        try {
            return await this.userModel.find().exec()
        } catch (error) {
            throw new InternalServerErrorException("failed to get all user details")
        }
        
    }

    async findByEmail(email:string): Promise<User | null>{
        try {
            return await this.userModel.findOne({email}).exec()
        } catch (error) {
            throw new InternalServerErrorException("unable to fetch by email")
        }
        
    }
}
