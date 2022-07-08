import type { NextApiRequest, NextApiResponse } from 'next';
import MovieModel, { Movie } from '../../../backend/models/Movie';

type Data = {
  success: boolean;
  movie?: Movie | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { imdbID } = req.query;

    const movie = await MovieModel.findByPk(imdbID as string).then((res) => res?.get() || null);

    return res.status(200).json({ success: true, movie });
  }

  res.status(404).json({ success: false });
}
