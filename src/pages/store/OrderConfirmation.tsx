import { Link, useParams } from "react-router-dom";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Thank you for your order!</h1>
      <p className="text-gray-600 mb-2">
        Your order has been placed successfully. We will contact you to confirm delivery.
      </p>
      {id && (
        <p className="text-sm text-gray-500 mb-8">
          Order reference: <span className="font-mono">{id}</span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Continue shopping
        </Link>
        <Link to="/" className="px-6 py-3 border border-purple-600 text-purple-600 rounded-md">
          Back to home
        </Link>
      </div>
    </div>
  );
}
