import httpStatus from 'http-status';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { reviewServices } from './review.services';

const createReview = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await reviewServices.createReviewToDb(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfull',
    data: result,
  });
});
const getAllReview = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await reviewServices.getReviewFromDb(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrived successfull',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReview,
};
