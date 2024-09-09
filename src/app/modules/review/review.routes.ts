import express from 'express';
import { reviewController } from './review.controller';
const router = express.Router();

router.get('/:productId', reviewController.getAllReview);
router.post('/add-review', reviewController.createReview);

export const reviewRotuers = router;
