import { getCookie, removeCookies, setCookie } from 'cookies-next';
import AES from '../backend/utils/AES';

class AccessCookie {
  static KEY = 'ACCESS';

  static getToken(req?: any, res?: any): string | null {
    const accessToken = getCookie(AccessCookie.KEY, { req, res });

    if (typeof accessToken !== 'string') {
      return null;
    }

    return AES.decrypt(accessToken) || null;
  }

  static setToken(accessToken: string) {
    setCookie(AccessCookie.KEY, AES.encrypt(accessToken), { secure: true, maxAge: 60 * 12 });
  }

  static removeToken() {
    removeCookies(AccessCookie.KEY);
  }
}

export default AccessCookie;
