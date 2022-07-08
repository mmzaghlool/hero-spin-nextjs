import jwt from 'jsonwebtoken';
import moment from 'moment';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './constants';

type tokenType = 'ACCESS' | 'REFRESH';

export default class JWT {
  static signJWT(uid: string, tokenType: tokenType, createdAt = moment().unix()) {
    let expiresIn;
    let secret;

    try {
      if (tokenType === 'ACCESS') {
        secret = ACCESS_TOKEN_SECRET;
        expiresIn = '12h';
      } else {
        secret = REFRESH_TOKEN_SECRET;
        expiresIn = '1w';
      }

      if (!secret) {
        throw new Error('secret undefined: ' + tokenType);
      }

      const user = { uid, createdAt };
      return jwt.sign(user, secret, { expiresIn });
    } catch (err) {
      throw err;
    }
  }

  static verifyJWT(token: string, tokenType: tokenType): { uid: string; createdAt: string } {
    let secret;
    try {
      if (tokenType === 'ACCESS') {
        secret = ACCESS_TOKEN_SECRET;
      } else {
        secret = REFRESH_TOKEN_SECRET;
      }

      if (!secret) {
        throw new Error('secret undefined: ' + tokenType);
      }

      const decoded: any = jwt.verify(token, secret);

      return { uid: decoded.uid, createdAt: decoded.createdAt };
    } catch (err) {
      throw err;
    }
  }

  static async checkUser(uid: string, authorization?: string) {
    try {
      if (!authorization) {
        return false;
      }
      const decoded = JWT.verifyJWT(authorization, 'ACCESS');

      return decoded.uid === uid;
    } catch (error) {
      return false;
    }
  }
}
