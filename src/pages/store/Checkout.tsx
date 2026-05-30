import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Divider, Stack, TextField } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import { ordersService } from "../../services/orders.service";
import type { CartItem } from "../../types/CartItem";

const BRAND = "#9810fa";
const BRAND_HOVER = "#7a0dc8";

const fieldSx = {
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: BRAND,
  },
  "& .MuiInputLabel-root.Mui-focused": { color: BRAND },
};

function OrderSummaryCard({
  items,
  subtotal,
  error,
  submitting,
  onSubmit,
}: {
  items: CartItem[];
  subtotal: number;
  error: string;
  submitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order summary</h2>

      <ul className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item.productVariantId} className="flex gap-3">
            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={item.image || "https://via.placeholder.com/64?text=Product"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{item.title}</p>
              <span className="inline-block mt-1 text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                {item.size} / {item.color}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Qty {item.quantity} × ${item.unitPrice.toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-900 shrink-0">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <Divider sx={{ my: 2 }} />

      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-purple-600 mb-4">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <p className="text-xs text-gray-500 text-center mb-4">
        Pay on delivery · No online payment required
      </p>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        disabled={submitting}
        onClick={onSubmit}
        sx={{
          py: 1.5,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
          bgcolor: BRAND,
          "&:hover": { bgcolor: BRAND_HOVER },
        }}
      >
        {submitting ? "Placing order…" : "Place order"}
      </Button>

      <Link
        to="/cart"
        className="block text-center text-sm text-purple-600 hover:text-purple-800 mt-4"
      >
        ← Back to cart
      </Link>
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart", { replace: true });
    }
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setFullName(storedName);
    }
  }, [items.length, navigate]);

  const buildShippingAddress = () => {
    const parts = [`City/Area: ${city.trim()}`, `Street: ${streetAddress.trim()}`];
    if (notes.trim()) {
      parts.push(`Notes: ${notes.trim()}`);
    }
    return parts.join(" | ");
  };

  const handleSubmit = async () => {
    setError("");
    if (!fullName.trim() || !phone.trim() || !city.trim() || !streetAddress.trim()) {
      setError("Please fill in all required delivery fields.");
      return;
    }

    setSubmitting(true);
    try {
      const userId = localStorage.getItem("userId");
      const order = await ordersService.createOrder({
        user: userId || undefined,
        guest: {
          name: fullName.trim(),
          phone: phone.trim(),
          address: streetAddress.trim(),
        },
        shippingAddress: buildShippingAddress(),
        items: items.map((i) => ({
          productVariantId: i.productVariantId,
          quantity: i.quantity,
        })),
      });
      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        "Failed to place order. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <Link to="/cart" className="hover:text-purple-600">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Checkout</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">Checkout</h1>
      <p className="text-gray-600 mb-6">Complete your delivery details to place your order.</p>

      {/* COD banner */}
      <div className="rounded-xl bg-purple-50 border border-purple-100 px-4 py-3 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-purple-900">
          <span className="font-semibold">Cash on delivery</span> — pay when your order arrives.
          Free delivery on orders over $25.
        </p>
        {!isAuthenticated && (
          <p className="text-sm text-purple-800 shrink-0">
            <Link
              to="/auth/login?returnUrl=/checkout"
              className="font-medium underline hover:text-purple-600"
            >
              Sign in
            </Link>{" "}
            to link this order to your account
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Mobile: summary first */}
        <div className="lg:hidden order-1">
          <OrderSummaryCard
            items={items}
            subtotal={subtotal}
            error={error}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Delivery form */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
            {isAuthenticated && user?.name && (
              <Alert severity="success" sx={{ mb: 4 }}>
                Ordering as <strong>{user.name}</strong> — confirm delivery details below.
              </Alert>
            )}

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
              <p className="text-sm text-gray-500 mb-4">We&apos;ll call you to confirm delivery.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Full name"
                  required
                  fullWidth
                  size="medium"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  sx={fieldSx}
                />
                <TextField
                  label="Phone number"
                  required
                  fullWidth
                  size="medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={fieldSx}
                />
              </div>
            </section>

            <Divider sx={{ mb: 4 }} />

            {/* Address */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900">Delivery address</h2>
              <p className="text-sm text-gray-500 mb-4">Where should we deliver your order?</p>
              <Stack spacing={3}>
                <TextField
                  label="City / area"
                  required
                  fullWidth
                  size="medium"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  sx={fieldSx}
                />
                <TextField
                  label="Street address"
                  required
                  fullWidth
                  size="medium"
                  multiline
                  rows={3}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  sx={fieldSx}
                />
                <TextField
                  label="Delivery notes (optional)"
                  fullWidth
                  size="medium"
                  multiline
                  rows={2}
                  placeholder="Building, floor, landmarks…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={fieldSx}
                />
              </Stack>
            </section>

          </div>
        </div>

        {/* Desktop: sticky summary */}
        <div className="hidden lg:block lg:col-span-1 order-3">
          <OrderSummaryCard
            items={items}
            subtotal={subtotal}
            error={error}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
