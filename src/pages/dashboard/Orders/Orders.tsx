import { useState, useEffect, useMemo } from "react";
import GenericTable from "../../../components/Table/GenericTable";
import { ordersConfig } from "./config";
import OrdersFilter from "./OrdersFilterComponent";
import OrderDrawer from "./OrderDrawer";
import type {
  OrdersTableData,
  OrderApiResponse,
  CreateOrderItem,
  GuestInfo,
} from "../../../types/Order";
import type { ProductsTableData } from "../../../types/Product";
import type {
  ProductVariantsTableData,
  ProductVariantApiResponse,
} from "../../../types/ProductVariant";
import type { UsersTableData } from "../../../types/User";
import { ordersService } from "../../../services/orders.service";
import { productsService } from "../../../services/products.service";
import { productVariantsService } from "../../../services/productVariants.service";
import { usersService } from "../../../services/users.service";

function transformOrder(order: OrderApiResponse): OrdersTableData {
  const items = order.items || [];
  // totalAmount may come from the API directly, or we calculate from items
  const totalAmount =
    order.totalAmount ??
    items.reduce((sum, item) => {
      const price =
        typeof item.productVariantId === "object"
          ? item.productVariantId.price ?? 0
          : item.price ?? 0;
      return sum + price * item.quantity;
    }, 0);

  // user may be populated (object), a string ID, or absent (guest)
  let userId = "";
  let userName = "";
  if (order.guest && order.guest.name) {
    userName = `${order.guest.name} (Guest)`;
  } else if (typeof order.user === "object" && order.user !== null) {
    userId = order.user._id;
    userName = order.user.name || order.user.email || userId;
  } else if (order.user) {
    userId = order.user;
    userName = order.user;
  }

  return {
    id: order._id,
    user: userId,
    userName,
    shippingAddress: order.shippingAddress || "",
    // Store items as stringified JSON so the table can handle string[]
    items: [JSON.stringify(items)],
    status: order.status || "pending",
    totalAmount,
    createdAt: order.createdAt || "",
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<OrdersTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrdersTableData | null>(
    null
  );
  const [products, setProducts] = useState<ProductsTableData[]>([]);
  const [variants, setVariants] = useState<ProductVariantsTableData[]>([]);
  const [users, setUsers] = useState<UsersTableData[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await usersService.getUsers();
      const transformed: UsersTableData[] = data.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        createdAt: user.createdAt || "",
        updatedAt: user.updatedAt || "",
      }));
      setUsers(transformed);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await productsService.getProducts();
      const transformed: ProductsTableData[] = data.map((product: any) => ({
        id: product._id || product.id,
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        category: product.category?.name || product.category || "",
        categoryId: product.category?._id || product.category?.id || "",
        images: product.images || [],
      }));
      setProducts(transformed);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVariants = async () => {
    try {
      const data: ProductVariantApiResponse[] =
        await productVariantsService.getVariants();
      const transformed: ProductVariantsTableData[] = data.map((v) => {
        let productId = "";
        let productTitle = "";
        if (typeof v.product === "object" && v.product !== null) {
          productId = v.product._id;
          productTitle = v.product.title;
        } else {
          productId = v.product;
          productTitle = v.product;
        }
        return {
          id: v._id,
          product: productId,
          productTitle,
          size: v.size || "",
          color: v.color || "",
          sku: v.sku || "",
          stock: v.stock ?? 0,
          extraPrice: v.extraPrice ?? 0,
        };
      });
      setVariants(transformed);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data: OrderApiResponse[] = await ordersService.getOrders();
      setOrders(data.map(transformOrder));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchVariants();
    fetchUsers();
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const handleFilterChange = (next: { status: string }) => {
    setStatusFilter(next.status);
  };

  const handleFilterClear = () => {
    setStatusFilter("all");
  };

  const handleAdd = () => {
    setEditingOrder(null);
    setDrawerOpen(true);
  };

  const handleEdit = (order: OrdersTableData) => {
    setEditingOrder(order);
    setDrawerOpen(true);
  };

  const handleDelete = async (ids: readonly (string | number)[]) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} order(s)?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        ids.map((id) => ordersService.deleteOrder(String(id)))
      );
      await fetchOrders();
    } catch (error) {
      console.error("Error deleting orders:", error);
      alert("Failed to delete orders");
    }
  };

  const handleSubmitOrder = async (data: {
    user?: string;
    guest?: GuestInfo;
    shippingAddress: string;
    status: string;
    items: CreateOrderItem[];
  }) => {
    if (editingOrder) {
      await ordersService.updateOrder(editingOrder.id, {
        status: data.status,
        shippingAddress: data.shippingAddress,
      });
    } else {
      const payload: {
        user?: string;
        guest?: GuestInfo;
        shippingAddress: string;
        items: CreateOrderItem[];
      } = {
        shippingAddress: data.shippingAddress,
        items: data.items,
      };
      if (data.user) {
        payload.user = data.user;
      } else if (data.guest) {
        payload.guest = data.guest;
      }
      await ordersService.createOrder(payload);
    }
    await fetchOrders();
  };

  const config = {
    ...ordersConfig,
    filterComponent: (
      <OrdersFilter
        status={statusFilter}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
      />
    ),
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <>
      <GenericTable data={filteredOrders} config={config} />
      <OrderDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingOrder(null);
        }}
        order={editingOrder}
        products={products}
        variants={variants}
        users={users}
        onSubmit={handleSubmitOrder}
      />
    </>
  );
}
