import IORder from './order.interface';
import Order from './order.model';

const createOrderIntoDb = async (payload: IORder) => {
  const newOrder = await Order.create(payload);
  return newOrder;
};
const getAllOrdersFromDb = async () => {
  const allOrders = await Order.find();
  return allOrders;
};
const getSingleOrderFromDb = async (id: string) => {
  const order = await Order.findById(id);
  return order;
};
const updateOrder = async (id: string, payload: Partial<IORder>) => {
  const { products, user, ...remainingUpdatedData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUpdatedData,
  };

  if (products && Object.keys(products).length) {
    for (const [key, value] of Object.entries(products)) {
      modifiedUpdatedData[`products.${key}`] = value;
    }
  }

  if (user && Object.keys(user).length) {
    for (const [key, value] of Object.entries(user)) {
      modifiedUpdatedData[`user.${key}`] = value;
    }
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return updatedOrder;
};

const deletedOrderFromDb = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return result;
};

export const orderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
  getSingleOrderFromDb,
  updateOrder,
  deletedOrderFromDb,
};
