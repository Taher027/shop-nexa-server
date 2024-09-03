import IUser from './user.interface';
import User from './user.model';

const createUserToDb = async (data: IUser) => {
  const newUser = User.create(data);
  return newUser;
};

const updateUserIntoDb = async (id: string, data: Partial<IUser>) => {
  const { name, ...remainingData } = data;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  const result = await User.findOneAndUpdate({ _id: id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const userServices = {
  createUserToDb,
  updateUserIntoDb,
};
