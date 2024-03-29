export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '';
export const DATABASE_NAME = process.env.DATABASE_NAME || '';
export const DATABASE_HOST = process.env.DATABASE_HOST || '';
export const DATABASE_USER = process.env.DATABASE_USER || '';
export const DATABASE_PASS = process.env.DATABASE_PASS || '';
export const API_KEY = process.env.API_KEY || '';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const API = IS_PRODUCTION ? 'https://hero-spin.mostafa-mahmoud.com' : 'http://localhost:3000';
