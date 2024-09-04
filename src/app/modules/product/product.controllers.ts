import httpStatus from 'http-status';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { productservice } from './product.services';

const createProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await productservice.createProductIntoDb(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product create successfull',
    data: result,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productservice.getAllProdcutsFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All product retrived successfull',
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productservice.getSingleProductFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrived successfull',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;

  const payload = req.body;
  const result = await productservice.updateProductIntoDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfull',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productservice.delteProductfromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product delete successfull',
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
