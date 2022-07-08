import type { NextApiRequest, NextApiResponse } from 'next';
import UserMovieModel from '../../../backend/models/UsersMovies';
import JWT from '../../../backend/utils/JWT';

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { uid, imdbID, status } = req.body;
    const { authorization } = req.headers;

    if (!uid || status === undefined) {
      return res.status(400).json({ success: false });
    }

    const valid = JWT.checkUser(uid, authorization);
    if (!valid) {
      return res.status(401).json({ success: false });
    }

    await UserMovieModel.bulkCreate([{ uid, imdbID, status }], { updateOnDuplicate: ['status'] }).then((results) => results[0]);

    return res.status(200).json({ success: true });
  }

  res.status(404).json({ success: false });
}
