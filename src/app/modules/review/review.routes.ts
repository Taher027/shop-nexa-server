import express from 'express';
import { reviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  reviewController.getAllReview,
);
router.post(
  '/add-review',
  auth(USER_ROLE.admin, USER_ROLE.user),
  reviewController.createReview,
);

export const reviewRotuers = router;
