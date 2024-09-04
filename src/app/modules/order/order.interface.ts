import { Schema } from 'mongoose';

interface IORder {
  products: {
    productId: Schema.Types.ObjectId;
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
  totalAmmount: number;
  shippingCost: number;
}
export default IORder;
