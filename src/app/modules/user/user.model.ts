import { model, Schema } from 'mongoose';
import { IUser, TUserName, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: String,
  middleName: String,
  lastName: String,
});
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      immutable: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Passwrod is required'],
      select: 0,
    },
    passwordChangedAt: { type: Date },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      immutable: true,
      messsage: '{VALUE} is not a expected role!',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      message: '{VALUES}  is not a expected gender',
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// hashed password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set pass " " after saving pass

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email: email }).select('+password');
};
userSchema.statics.isPassMatched = async function (
  plainTextPass: string,
  hashedPass: string,
) {
  return bcrypt.compare(plainTextPass, hashedPass);
};

userSchema.statics.isJWTIssuedBeforePassChange = function (
  passwordChangeTime: Date,
  jwtIssuedTime: number,
) {
  const passwordChangedTime = new Date(passwordChangeTime).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTime;
};

const User = model<IUser, UserModel>('User', userSchema);
export default User;
