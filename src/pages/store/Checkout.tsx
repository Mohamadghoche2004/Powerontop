import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { ordersService } from "../../services/orders.service";
import { ButtonComponent } from "../../components/ui/Button";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-600 mb-2">Checkout</h1>
      <p className="text-gray-600 mb-8">
        Cash on delivery — no account required.{" "}
        <Link to="/auth/login" className="text-purple-600">
          Sign in
        </Link>{" "}
        to link this order to your account.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Delivery details</h2>
          <TextField
            label="Full name *"
            fullWidth
            size="small"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="Phone number *"
            fullWidth
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="City / area *"
            fullWidth
            size="small"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            label="Street address *"
            fullWidth
            size="small"
            multiline
            rows={2}
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <TextField
            label="Delivery notes (optional)"
            fullWidth
            size="small"
            multiline
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <ButtonComponent
            text={submitting ? "Placing order..." : "Place order"}
            color="#9810fa"
            onClick={handleSubmit}
            className="w-full max-w-xs"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <ul className="space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.productVariantId} className="flex justify-between gap-4">
                <span>
                  {item.title} ({item.size}/{item.color}) × {item.quantity}
                </span>
                <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mt-6 text-purple-600">Total: ${subtotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
