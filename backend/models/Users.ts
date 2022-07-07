/* eslint-disable new-cap */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../core/sequelize';
import JWT from '../utils/JWT';

export type userType = {
  uid: string;
  name: string;
  email: string;
  passwordHash: string;
};

class UserModel extends Model<userType, Optional<userType, 'uid'>> {
  /**
   * Get user data (name, email), generate accessToken and refreshToken
   */
  static async login(uid: string) {
    const user = await UserModel.findByPk(uid, { attributes: ['name', 'email'] }).then((res) => res?.get());
    if (!user) {
      return undefined;
    }

    const accessToken = JWT.signJWT(uid, 'ACCESS');
    const refreshToken = JWT.signJWT(uid, 'REFRESH');

    return { accessToken, refreshToken, user: { ...user, uid } };
  }
}

UserModel.init(
  {
    uid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(45), allowNull: false },
    email: { type: DataTypes.STRING(320), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(128), allowNull: false },
  },
  { sequelize, modelName: 'users', updatedAt: false },
);

export default UserModel;
