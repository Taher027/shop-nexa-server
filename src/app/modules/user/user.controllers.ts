import httpStatus from 'http-status';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { userServices } from './user.services';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUserToDb(data);

  const { refreshToken, ...remaining } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user create succesfull',
    data: remaining,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await userServices.updateUserIntoDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfull',
    data: result,
  });
});

export const userController = {
  createUser,
  updateUser,
};
