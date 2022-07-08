import type { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import MovieModel from '../../../backend/models/Movie';
import UserMovieModel from '../../../backend/models/UsersMovies';
import JWT from '../../../backend/utils/JWT';

type Data = {
  success: boolean;
  movies?: any[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { uid } = req.query;
    const { authorization } = req.headers;

    if (typeof uid === 'string') {
      const valid = JWT.checkUser(uid, authorization);

      if (!valid) {
        return res.status(401).json({ success: false });
      }
    }

    const ids = await UserMovieModel.findAll({ attributes: ['imdbID'], where: { uid, status: 1 } }).then((m) =>
      m.map((movie) => movie.get('imdbID') as string),
    );

    const movies = await MovieModel.findAll({
      attributes: ['imdbID', 'Title', 'Poster'],
      where: { imdbID: { [Op.in]: ids } },
    });

    return res.status(200).json({ success: true, movies });
  }

  res.status(404).json({ success: false });
}
