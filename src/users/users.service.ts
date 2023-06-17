import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async create(username: string, password: string): Promise<UserModel> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  async findOne(username: string): Promise<UserModel | null> {
    return this.userModel.findOne({ username });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const { username, password } = createUserDto;
    return this.create(username, password);
  }

  async findById(id: string): Promise<UserModel> {
    return this.usersRepository.findOne({ where: { id: parseInt(id) } });
  }
}
