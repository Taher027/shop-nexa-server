import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validations';
import { authControllers } from './auth.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
