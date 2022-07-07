import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import UserModel from '../../../backend/models/Users';
import RegistrationCodes from '../../../types/RegistrationCodes';
import validateRegistration from '../../../validations/registration';

type Data = {
  success: boolean;
  code: RegistrationCodes;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: { uid: string; name: string; email: string };
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const valid = validateUser(name, email, password);
    if (!valid) {
      return res.status(400).json({ success: false, code: RegistrationCodes.INVALID_DATA });
    }

    const uid = await registerUser(name, email, password);

    if (!uid) {
      return res.status(200).json({ success: false, code: RegistrationCodes.EMAIL_USED });
    }

    const data = await UserModel.login(uid);
    return res.status(200).json({ success: true, code: RegistrationCodes.REGISTERED, data });
  }

  res.status(404).json({ success: false, code: RegistrationCodes.NOT_FOUND });
}

function validateUser(name: string, email: string, password: string) {
  return validateRegistration({ email, name, password }).valid;
}

async function registerUser(name: string, email: string, password: string): Promise<string | undefined> {
  const passwordHash = await hash(password, 10);
  return UserModel.create({ email, name, passwordHash })
    .then((res) => res.get('uid') as string)
    .catch(() => undefined);
}
