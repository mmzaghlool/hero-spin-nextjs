/* eslint-disable new-cap */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../core/sequelize';

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  BoxOffice: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Awards: string;
}

class MovieModel extends Model<Movie, { imdbID: string; Title: string; Poster?: string }> {}

MovieModel.init(
  {
    imdbID: { type: DataTypes.STRING(15), allowNull: false, primaryKey: true },
    Title: { type: DataTypes.STRING(128), allowNull: false },
    Poster: { type: DataTypes.STRING(512), allowNull: true },
    imdbRating: { type: DataTypes.STRING(5), allowNull: true },
    imdbVotes: { type: DataTypes.STRING(10), allowNull: true },
    BoxOffice: { type: DataTypes.STRING(15), allowNull: true },
    Rated: { type: DataTypes.STRING(15), allowNull: true },
    Released: { type: DataTypes.STRING(15), allowNull: true },
    Runtime: { type: DataTypes.STRING(10), allowNull: true },
    Genre: { type: DataTypes.STRING(128), allowNull: true },
    Director: { type: DataTypes.STRING(128), allowNull: true },
    Writer: { type: DataTypes.STRING(128), allowNull: true },
    Actors: { type: DataTypes.STRING(256), allowNull: true },
    Plot: { type: DataTypes.STRING(1024), allowNull: true },
    Awards: { type: DataTypes.STRING(128), allowNull: true },
  },
  { sequelize, modelName: 'movies', createdAt: false, updatedAt: false },
);

export default MovieModel;
