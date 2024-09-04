import { model, Schema } from 'mongoose';
import IProduct from './product.interface';

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
  },
  category: {
    type: String,
    required: [true, 'Product Category is required'],
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  brand: {
    type: String,
  },
  tags: {
    type: [String],
  },
  totalSell: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['in-stock', 'stock-out'],
    required: [true, 'Product status is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// qury middleware
productSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

const Product = model<IProduct>('Product', productSchema);
export default Product;
