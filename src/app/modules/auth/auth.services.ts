import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from '../user/auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import handleDecoded from '../../middlewares/auth.decode';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (!(await User.isPassMatched(payload.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // ceate token for varified user
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found');
  }

  if (!(await User.isPassMatched(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { email: userData.email },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );

  return null;
};
const refreshToken = async (token: string) => {
  const decoded = handleDecoded(token);
  const { email, iat } = decoded;
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized!');
  }
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePassChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    accessToken,
  };
};

export const authService = {
  loginUser,
  changePassword,
  refreshToken,
};
