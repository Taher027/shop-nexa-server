import httpStatus from 'http-status';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { orderServices } from './order.services';

const createOrder = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await orderServices.createOrderIntoDb(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order create successfull',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrdersFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrived successfull',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.getSingleOrderFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrived successfull',
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.deletedOrderFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrived successfull',
    data: result,
  });
});
const updatedOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await orderServices.updateOrder(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrived successfull',
    data: result,
  });
});
export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updatedOrder,
  deleteOrder,
};
