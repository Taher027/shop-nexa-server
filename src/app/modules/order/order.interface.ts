import { Schema } from 'mongoose';

interface IORder {
  products: {
    productId: Schema.Types.ObjectId;
    price: number;
    quantity: number;
  }[];
  user: {
    UserId: Schema.Types.ObjectId;
    userName: string;
    userEmail: string;
    userPhone: string;
  };
  shippingAddress: string;
  orderDate: Date;
  totalAmount: number;
  shippingCost: number;
  subTotal: number;
  isDeleted?: boolean;
}
export default IORder;
