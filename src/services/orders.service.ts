import { ordersApi } from "../api/orders.api";
import type { CreateOrderItem, GuestInfo } from "../types/Order";

export const ordersService = {
  getOrders: async () => {
    const response = await ordersApi.getOrders();
    return response.data;
  },
  getOrder: async (orderId: string) => {
    const response = await ordersApi.getOrder(orderId);
    return response.data;
  },
  createOrder: async (data: {
    user?: string;
    guest?: GuestInfo;
    shippingAddress: string;
    items: CreateOrderItem[];
  }) => {
    const response = await ordersApi.createOrder(data);
    return response.data;
  },
  updateOrder: async (
    orderId: string,
    data: Partial<{ status: string; shippingAddress: string }>
  ) => {
    const response = await ordersApi.updateOrder(orderId, data);
    return response.data;
  },
  deleteOrder: async (orderId: string) => {
    const response = await ordersApi.deleteOrder(orderId);
    return response.data;
  },
};
