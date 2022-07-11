import aes from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import { ENCRYPTION_KEY } from './constants';

export default class AES {
  static encrypt(text: string) {
    return aes.encrypt(text, ENCRYPTION_KEY).toString();
  }

  static decrypt(text?: string) {
    if (!text) {
      return undefined;
    }

    const bytes = aes.decrypt(text, ENCRYPTION_KEY);
    return bytes.toString(Base64);
  }
}
