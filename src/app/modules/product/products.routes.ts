import express from 'express';
import { productController } from './product.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { productValidation } from './product.validations';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.post(
  '/add-product',
  validateRequest(productValidation.creatProductValidations),
  auth(USER_ROLE.admin),
  productController.createProduct,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(productValidation.productUpdatedSchema),

  productController.updateProduct,
);
router.delete('/:id', auth(USER_ROLE.admin), productController.deleteProduct);

export const productRoutes = router;
