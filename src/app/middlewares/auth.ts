import { NextFunction, Request, Response } from 'express';
import catchAsync from '../uitls/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import handleDecoded from './auth.decode';
import User from '../modules/user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = handleDecoded(token);
    const { email, role, iat } = decoded;

    const user = await User.isUserExistByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not Found"');
    }
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePassChange(user.passwordChangedAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
