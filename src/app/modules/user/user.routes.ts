import express from 'express';
import { userController } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidations.userValidationSchema),
  userController.createUser
);
router.patch(
  '/:id',
  validateRequest(userValidations.updateUserShcema),
  userController.updateUser
);

export const userRotes = router;
