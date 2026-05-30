export interface CartItem {
  productVariantId: string;
  productId: string;
  title: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
  image?: string;
  maxStock: number;
}
