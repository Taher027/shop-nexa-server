import express from 'express';
import { orderController } from './order.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidations } from './order.validations';
const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getSingleOrder);
router.post(
  '/create-order',
  validateRequest(orderValidations.createOrderValidationsSchema),
  orderController.createOrder,
);
router.patch(
  '/:id',
  validateRequest(orderValidations.updateOrderValidationsSchema),
  orderController.updatedOrder,
);
router.delete('/:id', orderController.deleteOrder);
export const orderRoutes = router;
