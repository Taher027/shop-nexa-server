import express from 'express';
import { userRotes } from '../modules/user/user.routes';
import { productRoutes } from '../modules/product/products.routes';
import { reviewRotuers } from '../modules/review/review.routes';
import { orderRoutes } from '../modules/order/order.routes';
import { authRoutes } from '../modules/auth/auth.routes';
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
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/reviews',
    route: reviewRotuers,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
