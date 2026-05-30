import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsService } from "../../services/products.service";
import { VariantPickerModal, type ProductForCart } from "../../components/VariantPickerModal";

interface StoreProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  isActive: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [pickerProduct, setPickerProduct] = useState<ProductForCart | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productsService.getProducts();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">Shop</h1>
      {loading && <p className="text-gray-600">Loading products...</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-600">No products available right now.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Link to={`/products/${product._id}`}>
              <div className="aspect-square bg-gray-100">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/400?text=No+Image"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/products/${product._id}`}>
                <h2 className="text-lg font-semibold text-gray-800 hover:text-purple-600">
                  {product.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-purple-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  type="button"
                  className="px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                  onClick={() =>
                    setPickerProduct({
                      _id: product._id,
                      title: product.title,
                      price: product.price,
                      images: product.images,
                    })
                  }
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <VariantPickerModal
        open={Boolean(pickerProduct)}
        onClose={() => setPickerProduct(null)}
        product={pickerProduct}
      />
    </div>
  );
}
