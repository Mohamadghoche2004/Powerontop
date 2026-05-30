import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productsService } from "../../services/products.service";
import { VariantPickerModal, type ProductForCart } from "../../components/VariantPickerModal";

interface StoreProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await productsService.getProduct(id);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p>Product not found.</p>
        <Link to="/products" className="text-purple-600">
          Back to shop
        </Link>
      </div>
    );
  }

  const pickerProduct: ProductForCart = {
    _id: product._id,
    title: product.title,
    price: product.price,
    images: product.images,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/products" className="text-purple-600 text-sm mb-4 inline-block">
        ← Back to shop
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/600?text=No+Image"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-2xl font-bold text-purple-600 mt-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>
          <button
            type="button"
            className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => setPickerOpen(true)}
          >
            Add to cart
          </button>
        </div>
      </div>

      <VariantPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        product={pickerProduct}
      />
    </div>
  );
}
