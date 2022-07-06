// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../backend/models/Users';

type Data = {
  users: UserModel[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const users = await UserModel.findAll();

  res.status(200).json({ users });
}
