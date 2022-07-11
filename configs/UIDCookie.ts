import { getCookie, removeCookies, setCookie } from 'cookies-next';

class UIDCookie {
  static KEY = 'UID';

  static getUid(req?: any, res?: any): string | null {
    return getCookie(UIDCookie.KEY, { req, res }) as string | null;
  }

  static setUid(uid: string) {
    setCookie(UIDCookie.KEY, uid, { secure: true, maxAge: 60 * 12 });
  }

  static removeUid() {
    removeCookies(UIDCookie.KEY);
  }
}

export default UIDCookie;
