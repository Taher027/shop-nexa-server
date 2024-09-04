import express from 'express';
import { reviewController } from './review.controller';
const router = express.Router();

router.post('/add-review', reviewController.createReview);
router.get('/:productId', reviewController.getAllReview);

export const reviewRotuers = router;
