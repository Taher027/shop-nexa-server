import { z } from 'zod';

const orderProductsValidationSchema = z.object({
  productId: z.string({ message: 'Product is required' }),
  price: z
    .number({ message: 'Product price is required' })
    .positive({ message: 'price must be positive' })
    .int({ message: 'Product quantity must be an integer' }),
  quantity: z
    .number({ message: 'Product Quantity is required' })
    .positive({ message: 'Quantity must be positive' })
    .int({ message: 'Product quantity must be an integer' }),
});

const userUpdateSchema = z.object({
  userId: z.string().optional(),
  userName: z.string().optional(),
  userEmail: z.string().email('Invalid email address').optional(),
  userPhone: z.string().optional(),
});
const productUpdateSchema = z.object({
  productId: z.string().optional(),
  price: z
    .number()
    .positive('Product price must be positive')
    .int('Product price must be an integer')
    .optional(),
  quantity: z
    .number()
    .positive('Product quantity must be positive')
    .int('Product quantity must be an integer')
    .optional(),
});
const orderUserValidationSchema = z.object({
  userId: z.string({ message: 'User id is required' }),
  userName: z.string({ message: 'User Name is required' }),
  userEmail: z
    .string({ message: 'User email is required' })
    .email({ message: 'you must provide a valid email' }),
  userPhone: z.string({ message: 'User phone is required' }),
});

const createOrderValidationsSchema = z.object({
  body: z.object({
    products: z
      .array(orderProductsValidationSchema)
      .nonempty({ message: 'At least one product is required' }),
    user: orderUserValidationSchema,
    orderDate: z
      .string({ message: 'order date is required' })
      .refine((dateString) => !isNaN(Date.parse(dateString)), {
        message: 'Invalid date formate',
      }),
    totalAmount: z
      .number({ message: 'Total amount is required' })
      .int({ message: 'Total amount must be an integer' }),
    subTotal: z
      .number({ message: 'Sub toal is requied' })
      .positive({ message: 'Sub total must be positive' })
      .int({ message: 'Sub total must be an integer' }),
    isDeleted: z.boolean().default(false),
  }),
});
const updateOrderValidationsSchema = z.object({
  body: z.object({
    products: z.array(productUpdateSchema).optional(),
    user: userUpdateSchema.optional(),
    shippingAddress: z.string().optional(),
    orderDate: z.date().optional(),
    totalAmount: z
      .number()
      .positive('Total amount must be positive')
      .optional(),
    shippingCost: z
      .number()
      .positive('Shipping Cost must be positive')
      .optional(),
    subTotal: z.number().positive('Sub total must be positive').optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const orderValidations = {
  createOrderValidationsSchema,
  updateOrderValidationsSchema,
};
