import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../core/sequelize';

export type userType = {
  uid: string;
  name: string;
  email: string;
  passwordHash: string;
};

class UserModel extends Model<userType, Optional<userType, 'uid'>> {}

UserModel.init(
  {
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'users' },
);

export default UserModel;
