import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { authService } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User log in successfull',
    data: { accessToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const userDate = req.user;
  const result = await authService.changePassword(userDate, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfull',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access Token is retrieved successfull',
    data: result,
  });
});
export const authControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
