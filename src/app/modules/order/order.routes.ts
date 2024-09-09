import express from 'express';
import { orderController } from './order.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidations } from './order.validations';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getSingleOrder);
router.post(
  '/create-order',
  validateRequest(orderValidations.createOrderValidationsSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.createOrder,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(orderValidations.updateOrderValidationsSchema),
  orderController.updatedOrder,
);
router.delete('/:id', auth(USER_ROLE.admin), orderController.deleteOrder);
export const orderRoutes = router;
