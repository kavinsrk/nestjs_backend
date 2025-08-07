import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { MESSAGES} from "../common/constants"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: { name: string; email: string; password: string }) {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      const user = new this.userModel({
        name: dto.name,
        email: dto.email,
        password: hashed,
      });
      return user.save();
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.AUTH.REGISTER);
    }
  }

  async login(dto: { email: string; password: string }) {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user || !(await bcrypt.compare(dto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user._id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.AUTH.LOGIN_SUCCESS);
    }
  }
}