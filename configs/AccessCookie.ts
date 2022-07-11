import { getCookie, removeCookies, setCookie } from 'cookies-next';
import AES from '../backend/utils/AES';

class AccessCookie {
  static KEY = 'ACCESS';

  static getToken(req?: any, res?: any): string | null {
    return AES.decrypt((getCookie(AccessCookie.KEY, { req, res }) as string | null) || undefined) || null;
  }

  static setToken(accessToken: string) {
    setCookie(AccessCookie.KEY, AES.encrypt(accessToken), { secure: true, maxAge: 60 * 12 });
  }

  static removeToken() {
    removeCookies(AccessCookie.KEY);
  }
}

export default AccessCookie;
