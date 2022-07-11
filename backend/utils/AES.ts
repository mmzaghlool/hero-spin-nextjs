import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const ENCRYPTION_KEY = 'Test';

export default class AES {
  static encrypt(text: string) {
    return aes.encrypt(text, ENCRYPTION_KEY).toString();
  }
  static decrypt(text?: string) {
    if (!text) {
      return undefined;
    }
    const bytes = aes.decrypt(text, ENCRYPTION_KEY);
    return bytes.toString(Utf8);
  }
}
