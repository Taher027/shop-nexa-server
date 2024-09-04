import IReview from './review.interface';
import Review from './review.model';

const createReviewToDb = async (payload: IReview) => {
  const newReview = await Review.create(payload);
  return newReview;
};
const getReviewFromDb = async (productId: string) => {
  const result = await Review.find({ productId }).sort({ createdAt: -1 });
  return result;
};

export const reviewServices = {
  createReviewToDb,
  getReviewFromDb,
};
