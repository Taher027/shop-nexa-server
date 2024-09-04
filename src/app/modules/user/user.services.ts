import IUser from './user.interface';
import User from './user.model';

const createUserToDb = async (payload: IUser) => {
  const newUser = User.create(payload);
  return newUser;
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
