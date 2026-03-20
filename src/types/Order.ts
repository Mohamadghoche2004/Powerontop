import type { BaseTableData } from "../components/Table/type";

// Item shape sent to the API when creating an order
export interface CreateOrderItem {
  productVariantId: string;
  quantity: number;
}

// Guest info for non-logged-in users
export interface GuestInfo {
  name: string;
  phone: string;
  address: string;
}

// Item shape returned by the API (may be populated)
export interface OrderItemResponse {
  productVariantId:
    | string
    | {
        _id: string;
        productTitle?: string;
        size?: string;
        color?: string;
        price?: number;
      };
  quantity: number;
  price?: number;
  productTitle?: string;
  size?: string;
  color?: string;
}

export interface OrdersTableData extends BaseTableData {
  id: string;
  user: string;
  userName: string;
  shippingAddress: string;
  items: string[];
  status: string;
  totalAmount: number;
  createdAt: string;
}

// API response type for order (from backend)
export interface OrderApiResponse {
  _id: string;
  user?: string | { _id: string; name: string; email: string };
  guest?: GuestInfo;
  shippingAddress: string;
  items: OrderItemResponse[];
  status: string;
  totalAmount?: number;
  createdAt: string;
  updatedAt: string;
}
