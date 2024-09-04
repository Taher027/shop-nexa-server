import { z } from 'zod';

const creatProductValidations = z.object({
  body: z.object({
    title: z.string({ message: 'title is required!' }).max(50),
    description: z.string({ message: 'description is required!' }).max(1000),
    price: z.number({ message: 'price is required! and must number' }),
    quantity: z.number({ message: 'quantity is required! and must number' }),
    category: z.string({ message: 'category is required!' }),
    image: z.string({ message: 'image is required!' }),
    brand: z.string().optional(),
    tags: z.array(z.string()).optional(),
    totalSell: z.number().optional(),
    status: z.enum(['in-stock', 'stock-out']),
  }),
});
const productUpdatedSchema = z.object({
  body: z.object({
    title: z.string().max(50).optional(),
    description: z.string().max(1000).optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    brand: z.string().optional(),
    tags: z.array(z.string()).optional(),
    totalSell: z.number().optional(),
  }),
});
export const productValidation = {
  creatProductValidations,
  productUpdatedSchema,
};
