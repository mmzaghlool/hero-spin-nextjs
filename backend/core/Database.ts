import { MySQL, MySQLConfig } from 'nodejs-express-utils';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_USER } from '../utils/constants';

const encryptionKey: string = 'encryptionKey';

const config: MySQLConfig = {
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    timezone: 'z',
};

export default new MySQL(config, encryptionKey);
