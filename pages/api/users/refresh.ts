import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../backend/models/Users';
import JWT from '../../../backend/utils/JWT';

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
    const { refreshToken } = req.body;

    const uid = await checkUser(refreshToken);
    if (!uid) {
      return res.status(200).json({ success: false, data: undefined });
    }

    const data = await UserModel.login(uid);
    return res.status(200).json({ success: true, data });
  }

  res.status(404).json({ success: false });
}

async function checkUser(refreshToken: string) {
  try {
    const { uid } = JWT.verifyJWT(refreshToken, 'REFRESH');
    return uid;
  } catch (error) {
    console.log('error', error);

    return undefined;
  }
}
