import { Sequelize } from 'sequelize';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_USER } from '../utils/constants';

class Database {
  public sequelize;
  constructor() {
    this.sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASS, {
      host: DATABASE_HOST,
      dialect: 'mysql',
    });

    this.testConnection();
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async dbSync() {
    try {
      await this.sequelize.sync({ force: true });
      console.log('Database synced successfully.');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  }
}

export default new Database().sequelize;
