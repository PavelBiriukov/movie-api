import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() movieData: Movie): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() movieData: Movie): Promise<Movie> {
    return this.moviesService.update(id, movieData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Movie> {
    return this.moviesService.uploadPhoto(id, file);
  }
}
