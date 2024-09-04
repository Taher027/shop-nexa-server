import { model, Schema } from 'mongoose';
import IReview, { Tuser } from './review.interface';
const userReviewSchema = new Schema<Tuser>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },
  userImage: {
    type: String,
  },
});

const reviewSchema = new Schema<IReview>({
  user: userReviewSchema,
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Product rating is required'],
  },
  message: {
    type: String,
  },
});

const Review = model<IReview>('Review', reviewSchema);
export default Review;
