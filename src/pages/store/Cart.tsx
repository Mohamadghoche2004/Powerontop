import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">Your cart is empty</h1>
        <Link to="/products" className="text-purple-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6 sm:mb-8">Shopping cart</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.productVariantId}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          >
            {/* Top: image + details */}
            <div className="flex gap-3 sm:gap-4 p-4 pb-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={item.image || "https://via.placeholder.com/96?text=Product"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                  {item.title}
                </h2>
                <span className="inline-block mt-1 text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {item.size} / {item.color}
                </span>
                <p className="text-purple-600 font-medium mt-2 text-sm">
                  ${item.unitPrice.toFixed(2)} each
                </p>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base shrink-0 sm:hidden">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Bottom: qty, line total (desktop), remove */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 sm:hidden">Qty</span>
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-md border border-gray-300 bg-white text-lg leading-none hover:bg-gray-50"
                  onClick={() => updateQuantity(item.productVariantId, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-md border border-gray-300 bg-white text-lg leading-none hover:bg-gray-50 disabled:opacity-40"
                  disabled={item.quantity >= item.maxStock}
                  onClick={() => updateQuantity(item.productVariantId, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="hidden sm:block font-semibold text-gray-900">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                className="text-red-600 text-sm font-medium hover:text-red-800 ml-auto sm:ml-0"
                onClick={() => removeItem(item.productVariantId)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg sm:text-xl font-bold text-center sm:text-left">
            Subtotal: <span className="text-purple-600">${subtotal.toFixed(2)}</span>
          </p>
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
