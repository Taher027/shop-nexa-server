import { model, Schema } from 'mongoose';
import IUser, { TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: String,
  middleName: String,
  lastName: String,
});
const userSchema = new Schema<IUser>(
  {
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      immutable: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Passwrod is required'],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      values: ['admin', 'user'],
      default: 'user',
      messsage: '{VALUE} is not a expected role!',
    },
    gender: {
      type: String,
      values: ['male', 'female', 'others'],
      message: '{VALUES}  is not a expected gender',
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
