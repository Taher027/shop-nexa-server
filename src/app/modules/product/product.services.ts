import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import IProduct from './product.interface';
import Product from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './products.constant';

const createProductIntoDb = async (payload: IProduct) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};
const getAllProdcutsFromDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await productQuery.modelQuery;
  return result;
};
const getSingleProductFromDb = async (id: string) => {
  const singleProduct = await Product.findById(id);
  if (!singleProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product not Found');
  }
  return singleProduct;
};

const updateProductIntoDb = async (id: string, payload: Partial<IProduct>) => {
  const updatedInfo = payload;

  // checking if exist
  if (updatedInfo.title) {
    const existingProduct = await Product.findOne({
      title: updatedInfo.title,
      _id: { $ne: id },
    });
    if (existingProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Product already exist!');
    }
  }

  const updatedProduct = Product.findByIdAndUpdate(id, updatedInfo, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};
const delteProductfromDb = async (id: string) => {
  const deletedproduct = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedproduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  return deletedproduct;
};

export const productservice = {
  createProductIntoDb,
  updateProductIntoDb,
  getAllProdcutsFromDb,
  getSingleProductFromDb,
  delteProductfromDb,
};
