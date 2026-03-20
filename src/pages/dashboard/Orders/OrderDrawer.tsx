import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type {
  OrdersTableData,
  CreateOrderItem,
  GuestInfo,
  OrderItemResponse,
} from "../../../types/Order";
import type { ProductsTableData } from "../../../types/Product";
import type { ProductVariantsTableData } from "../../../types/ProductVariant";
import type { UsersTableData } from "../../../types/User";

interface OrderDrawerProps {
  open: boolean;
  onClose: () => void;
  order?: OrdersTableData | null;
  products?: ProductsTableData[];
  variants?: ProductVariantsTableData[];
  users?: UsersTableData[];
  onSubmit: (data: {
    user?: string;
    guest?: GuestInfo;
    shippingAddress: string;
    status: string;
    items: CreateOrderItem[];
  }) => Promise<void>;
}

interface ItemFormState {
  productVariantId: string;
  quantity: number;
}

const emptyItem: ItemFormState = {
  productVariantId: "",
  quantity: 1,
};

type CustomerType = "registered" | "guest";

export default function OrderDrawer({
  open,
  onClose,
  order,
  products = [],
  variants = [],
  users = [],
  onSubmit,
}: OrderDrawerProps) {
  const [customerType, setCustomerType] = useState<CustomerType>("registered");
  const [userId, setUserId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState<ItemFormState[]>([{ ...emptyItem }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setUserId(order.user || "");
      setShippingAddress(order.shippingAddress || "");
      setStatus(order.status || "pending");
      setCustomerType("registered");
      setGuestName("");
      setGuestPhone("");
      setGuestAddress("");
      setItems([{ ...emptyItem }]);
    } else {
      setCustomerType("registered");
      setUserId("");
      setGuestName("");
      setGuestPhone("");
      setGuestAddress("");
      setShippingAddress("");
      setStatus("pending");
      setItems([{ ...emptyItem }]);
    }
  }, [order, open]);

  const handleProductSelect = (index: number, productId: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], productVariantId: productId };
    setItems(updated);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], quantity };
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { ...emptyItem }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const getVariantPrice = (variantId: string) => {
    const variant = variants.find((v) => v.id === variantId);
    if (!variant) return 0;
    const product = products.find((p) => p.id === variant.product);
    const basePrice = product ? product.price : 0;
    return basePrice + variant.extraPrice;
  };

  const totalAmount = items.reduce((sum, item) => {
    return sum + getVariantPrice(item.productVariantId) * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress) {
      alert("Please fill in the shipping address");
      return;
    }

    if (!order) {
      if (customerType === "registered" && !userId) {
        alert("Please select a user");
        return;
      }

      if (customerType === "guest" && (!guestName || !guestPhone || !guestAddress)) {
        alert("Please fill in all guest fields");
        return;
      }

      if (items.some((item) => !item.productVariantId || item.quantity <= 0)) {
        alert("Please select a product and set a valid quantity for each item");
        return;
      }
    }

    setLoading(true);
    try {
      const payload: {
        user?: string;
        guest?: GuestInfo;
        shippingAddress: string;
        status: string;
        items: CreateOrderItem[];
      } = {
        shippingAddress,
        status,
        items: items.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
        })),
      };

      if (customerType === "registered") {
        payload.user = userId;
      } else {
        payload.guest = {
          name: guestName,
          phone: guestPhone,
          address: guestAddress,
        };
      }

      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to save order");
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!order;

  const parsedOrderItems: OrderItemResponse[] = (() => {
    if (!order?.items || order.items.length === 0) return [];
    try {
      return JSON.parse(order.items[0]) as OrderItemResponse[];
    } catch {
      return [];
    }
  })();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 550 } },
      }}
    >
      <Box sx={{ p: 3, overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">
            {isEditing ? "Edit Order" : "Create New Order"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          {/* Customer section */}
          {!isEditing && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Customer
              </Typography>
              <ToggleButtonGroup
                value={customerType}
                exclusive
                onChange={(_, value) => {
                  if (value) setCustomerType(value);
                }}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              >
                <ToggleButton value="registered">Registered User</ToggleButton>
                <ToggleButton value="guest">Guest</ToggleButton>
              </ToggleButtonGroup>

              {customerType === "registered" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>User</InputLabel>
                  <Select
                    value={userId}
                    label="User"
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {customerType === "guest" && (
                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    label="Guest Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Guest Address"
                    value={guestAddress}
                    onChange={(e) => setGuestAddress(e.target.value)}
                    required
                  />
                </Box>
              )}
            </>
          )}

          {isEditing && (
            <TextField
              fullWidth
              label="Customer"
              value={order?.userName || order?.user || ""}
              disabled
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            fullWidth
            label="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          {/* Order items */}
          {!isEditing && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Items
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
              </Box>

              {items.map((item, index) => {
                const selectedVariant = variants.find(
                  (v) => v.id === item.productVariantId
                );
                const unitPrice = getVariantPrice(item.productVariantId);

                return (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      position: "relative",
                    }}
                  >
                    {items.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(index)}
                        sx={{ position: "absolute", top: 4, right: 4 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Item {index + 1}
                    </Typography>

                    <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                      <InputLabel>Product Variant</InputLabel>
                      <Select
                        value={item.productVariantId}
                        label="Product Variant"
                        onChange={(e) =>
                          handleProductSelect(index, e.target.value)
                        }
                        required
                      >
                        {variants.map((variant) => {
                          const product = products.find(
                            (p) => p.id === variant.product
                          );
                          const productName =
                            product?.title || variant.productTitle;
                          const price =
                            (product?.price || 0) + variant.extraPrice;
                          return (
                            <MenuItem key={variant.id} value={variant.id}>
                              {productName} — {variant.size} / {variant.color} —
                              ${price.toFixed(2)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    {selectedVariant && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 1 }}
                      >
                        SKU: {selectedVariant.sku} | Stock:{" "}
                        {selectedVariant.stock} | Unit price: $
                        {unitPrice.toFixed(2)}
                      </Typography>
                    )}

                    <TextField
                      size="small"
                      fullWidth
                      label="Quantity"
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value) || 0
                        )
                      }
                      inputProps={{ min: "1" }}
                      required
                    />

                    {selectedVariant && item.quantity > 0 && (
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ mt: 1, textAlign: "right" }}
                      >
                        Subtotal: ${(unitPrice * item.quantity).toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                );
              })}

              {totalAmount > 0 && (
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: "grey.100",
                    borderRadius: 1,
                    mb: 2,
                    textAlign: "right",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Total: ${totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </>
          )}

          {/* Items summary for editing */}
          {isEditing && parsedOrderItems.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Order Items
              </Typography>
              {parsedOrderItems.map((item, index) => {
                const title =
                  typeof item.productVariantId === "object"
                    ? item.productVariantId.productTitle || "Product"
                    : item.productTitle || item.productVariantId;
                const price =
                  typeof item.productVariantId === "object"
                    ? item.productVariantId.price
                    : item.price;

                return (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      backgroundColor: "grey.50",
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {title}
                    </Typography>
                    <Typography variant="body2">
                      {item.quantity}
                      {price != null && ` x $${Number(price).toFixed(2)}`}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}
