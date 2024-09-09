import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export interface IUser {
  name: TUserName;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  gender?: 'male' | 'female' | 'others';
  profileImage?: string;
}
export interface UserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser>;
  isPassMatched(plainTextPass: string, hashedPass: string): Promise<boolean>;
  isJWTIssuedBeforePassChange(
    passwordChangeTime: Date,
    jwtIssuedTime: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
