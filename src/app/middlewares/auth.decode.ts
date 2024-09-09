import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
const handleDecoded = (token: string) => {
  let decoded = null;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Token has expired!');
  }

  return decoded;
};
export default handleDecoded;
