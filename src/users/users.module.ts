import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserSchema } from './user.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/movie-api'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Исправленный импорт User и UserSchema
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
