import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { LocalStrategy } from './auth/strategies/local/local.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './users/user.repository';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://user:user@cluster0.wakvgxp.mongodb.net/'),
    MoviesModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtService, UserRepository ],
  controllers: [AuthController]
})
export class AppModule {}
