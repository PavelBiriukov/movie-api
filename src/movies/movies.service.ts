import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  [x: string]: any;
  private readonly movies: Movie[] = [];

  findAll(): Promise<Movie[]> {
    return Promise.resolve(this.movies);
  }
  // Метод для получения списка всех фильмов, отсортированных по рейтингу
  async findAllSortedByRating(): Promise<Movie[]> {
    return this.movieModel.find().sort({ rating: -1 }).exec();
  }
  // Метод для обновления рейтинга фильма
  async updateRating(id: string, rating: number): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, { rating }, { new: true });
  }
  findOne(id: string): Promise<Movie> {
    const movie = this.movies.find(movie => movie.id === id);
    return Promise.resolve(movie);
  }

  create(movieData: Movie): Promise<Movie> {
    const movie: Movie = {
      id: (this.movies.length + 1).toString(),
      rating: 0,
      ...movieData,
    };
    this.movies.push(movie);
    return Promise.resolve(movie);
  }

  update(id: string, movieData: Movie): Promise<Movie> {
    const movieIndex = this.movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
      const updatedMovie = { id, ...movieData };
      this.movies[movieIndex] = updatedMovie;
      return Promise.resolve(updatedMovie);
    }
    return Promise.resolve(null);
  }

  remove(id: string): Promise<void> {
    const movieIndex = this.movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
      this.movies.splice(movieIndex, 1);
      return Promise.resolve();
    }
    return Promise.resolve();
  }

  uploadPhoto(id: string, file: Express.Multer.File): Promise<Movie> {
    const movieIndex = this.movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
      const updatedMovie = { ...this.movies[movieIndex], photo: file.filename };
      this.movies[movieIndex] = updatedMovie;
      return Promise.resolve(updatedMovie);
    }
    return Promise.resolve(null);
  }
}
