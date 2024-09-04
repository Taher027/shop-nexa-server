import express from 'express';
import { userRotes } from '../modules/user/user.routes';
import { productRoutes } from '../modules/product/products.routes';
import { reviewRotuers } from '../modules/review/review.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRotes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/reviews',
    route: reviewRotuers,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
