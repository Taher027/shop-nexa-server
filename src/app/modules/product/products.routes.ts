import express from 'express';
import { productController } from './product.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { productValidation } from './product.validations';
const router = express.Router();
router.post(
  '/add-product',
  validateRequest(productValidation.creatProductValidations),
  productController.createProduct,
);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.patch(
  '/:id',
  validateRequest(productValidation.productUpdatedSchema),
  productController.updateProduct,
);
router.delete('/:id', productController.deleteProduct);

export const productRoutes = router;
