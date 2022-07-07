class TokenStorage {
  static KEY = 'REFRESH_TOKEN';

  static getToken() {
    let token = localStorage.getItem(TokenStorage.KEY);
    return token;
  }

  static setToken(token: string) {
    localStorage.setItem(TokenStorage.KEY, token);
  }

  static removeToken() {
    localStorage.removeItem(TokenStorage.KEY);
  }
}

export default TokenStorage;
