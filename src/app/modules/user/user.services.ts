import config from '../../config';
import { createToken } from './auth.utils';
import { IUser } from './user.interface';
import User from './user.model';

const createUserToDb = async (payload: IUser) => {
  const newUser = await User.create(payload);

  // create token for new user
  const jwtPayload = {
    email: newUser?.email,
    role: newUser?.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  const newUserData = {
    user: newUser,
    token,
    refreshToken,
  };
  return newUserData;
};

const updateUserIntoDb = async (id: string, payload: Partial<IUser>) => {
  const { name, ...remainingData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  const updatedUser = await User.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

export const userServices = {
  createUserToDb,
  updateUserIntoDb,
};
