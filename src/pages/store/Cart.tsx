import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Your cart is empty</h1>
        <Link to="/products" className="text-purple-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">Shopping cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.productVariantId}
            className="flex gap-4 bg-white rounded-lg shadow p-4 items-center"
          >
            {item.image && (
              <img src={item.image} alt="" className="w-20 h-20 object-cover rounded" />
            )}
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">
                {item.size} / {item.color}
              </p>
              <p className="text-purple-600 font-medium mt-1">
                ${item.unitPrice.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded border border-gray-300"
                onClick={() => updateQuantity(item.productVariantId, item.quantity - 1)}
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                type="button"
                className="w-8 h-8 rounded border border-gray-300"
                disabled={item.quantity >= item.maxStock}
                onClick={() => updateQuantity(item.productVariantId, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="font-semibold w-24 text-right">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </p>
            <button
              type="button"
              className="text-red-600 text-sm"
              onClick={() => removeItem(item.productVariantId)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-xl font-bold">
          Subtotal: <span className="text-purple-600">${subtotal.toFixed(2)}</span>
        </p>
        <button
          type="button"
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
