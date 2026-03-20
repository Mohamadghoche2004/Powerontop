import { api } from "./axios";
import type { CreateOrderItem, GuestInfo } from "../types/Order";

export const ordersApi = {
  getOrders: async () => {
    const response = await api.get("/api/orders");
    return response;
  },
  getOrder: async (orderId: string) => {
    const response = await api.get(`/api/orders/${orderId}`);
    return response;
  },
  createOrder: async (data: {
    user?: string;
    guest?: GuestInfo;
    shippingAddress: string;
    items: CreateOrderItem[];
  }) => {
    const response = await api.post("/api/orders", data);
    return response;
  },
  updateOrder: async (
    orderId: string,
    data: Partial<{ status: string; shippingAddress: string }>
  ) => {
    const response = await api.put(`/api/orders/${orderId}`, data);
    return response;
  },
  deleteOrder: async (orderId: string) => {
    const response = await api.delete(`/api/orders/${orderId}`);
    return response;
  },
};
