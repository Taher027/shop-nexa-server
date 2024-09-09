import { model, Schema } from 'mongoose';
import IORder from './order.interface';

const orderSchema = new Schema<IORder>({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'productId is required'],
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
      },
    },
  ],
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required'],
    },
    userName: { type: String, required: [true, 'User Name is required'] },
    userEmail: { type: String, required: [true, 'User Email is Required'] },
    userPhone: { type: String, required: [true, 'User Phone is required'] },
  },
  shippingAddress: {
    type: String,
    required: [true, 'Shipping Address is required'],
  },
  orderDate: { type: Date, required: [true, 'Order date is Required'] },
  totalAmount: { type: Number, required: [true, 'Total ammount is required'] },
  shippingCost: { type: Number, required: [true, 'Shipping Cost is required'] },
  subTotal: { type: Number, required: [true, 'Sub total is required'] },
  isDeleted: { type: Boolean, default: false },
});
const Order = model<IORder>('Order', orderSchema);
export default Order;
