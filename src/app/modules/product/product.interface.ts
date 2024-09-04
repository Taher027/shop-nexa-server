interface IProduct {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  brand?: string;
  tags?: string[];
  totalSell?: number;
  status: 'in-stock' | 'stock-out';
  isDeleted: boolean;
}
export default IProduct;
