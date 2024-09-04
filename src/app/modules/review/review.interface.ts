import { Schema } from 'mongoose';
export type Tuser = {
  userId: Schema.Types.ObjectId;
  userName: string;
  userImage?: string;
};

interface IReview {
  user: Tuser;
  productId: Schema.Types.ObjectId;
  rating: number;
  message: string;
}
export default IReview;
