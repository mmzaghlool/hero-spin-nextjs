/* eslint-disable new-cap */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../core/sequelize';

// -1: Not marvel movie, 0: I Don't like it, 1: Watched
export type userMovieType = {
  uid: string;
  imdbID: string;
  status: -1 | 0 | 1;
};

class UserMovieModel extends Model<userMovieType, userMovieType> {}

UserMovieModel.init(
  {
    uid: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    imdbID: { type: DataTypes.STRING(15), allowNull: false, primaryKey: true },
    status: { type: DataTypes.TINYINT, allowNull: false },
  },
  { sequelize, modelName: 'users_movies', updatedAt: false },
);

export default UserMovieModel;
