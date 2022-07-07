import type { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import { compare } from 'bcrypt';
import UserModel from '../../../backend/models/Users';

type Data = {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: { uid: string; name: string; email: string };
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const uid = await checkUser(email, password);
    if (!uid) {
      return res.status(200).json({ success: false, data: undefined });
    }

    const data = await UserModel.login(uid);
    return res.status(200).json({ success: true, data });
  }

  res.status(404).json({ success: false });
}

async function checkUser(email: string, password: string) {
  const { uid, passwordHash } = await UserModel.findOne({
    attributes: ['uid', 'passwordHash'],
    where: {
      email: { [Op.eq]: email },
    },
  }).then((res) => res?.get() || { uid: '', passwordHash: '' });

  const valid = await compare(password, passwordHash);

  return valid ? uid : undefined;
}
