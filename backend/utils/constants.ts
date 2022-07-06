// require('dotenv').config();

export const DATABASE_NAME = process.env.DATABASE_NAME || '';
export const DATABASE_HOST = process.env.DATABASE_HOST || '';
export const DATABASE_USER = process.env.DATABASE_USER || '';
export const DATABASE_PASS = process.env.DATABASE_PASS || '';
export const API_KEY = process.env.API_KEY || '';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const API = IS_PRODUCTION ? 'http://hero-spin.mostafa-mahmoud.com' : 'http://localhost:3000';
