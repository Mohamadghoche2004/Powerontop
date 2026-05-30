import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productsService } from "../../services/products.service";
import type { ProductsTableData } from "../../types/Product";
import { mapApiProduct } from "./mapApiProduct";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductsTableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing product id.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsService.getProduct(id);
        if (cancelled) return;
        const mapped = mapApiProduct(data as Record<string, unknown>);
        if (!mapped.id) {
          setError("Product not found.");
          setProduct(null);
        } else {
          setProduct(mapped);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load this product.");
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-600">
        Loading…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-red-600">{error || "Product not found."}</p>
        <Link
          to="/products"
          className="mt-6 inline-block text-sm font-medium text-purple-600 hover:text-purple-700"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  const [mainImage, ...otherImages] = product.images;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="text-sm font-medium text-purple-600 hover:text-purple-700"
      >
        ← All products
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
            {mainImage ? (
              <img
                src={mainImage}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
          {otherImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {otherImages.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-20 w-20 rounded-lg object-cover ring-1 ring-gray-200"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-purple-600">
            {product.category || "Uncategorized"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
            {product.description || "No description."}
          </p>
        </div>
      </div>
    </div>
  );
}
