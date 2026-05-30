import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsService } from "../../services/products.service";
import type { ProductsTableData } from "../../types/Product";
import { mapApiProduct } from "./mapApiProduct";

export default function ProductCatalog() {
  const [products, setProducts] = useState<ProductsTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsService.getProducts();
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data.map((p: Record<string, unknown>) => mapApiProduct(p))
          : [];
        setProducts(list.filter((p) => p.id));
      } catch {
        if (!cancelled) setError("Could not load products.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-600">
        Loading products…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Products
      </h1>
      <p className="mt-2 text-gray-600">
        Browse the catalog and open an item for full details.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => {
          const image = product.images[0];
          return (
            <li key={product.id} className="min-w-0">
              <Link
                to={`/products/${product.id}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-purple-200 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-0.5 p-3">
                  <span className="truncate text-xs font-medium text-purple-600">
                    {product.category || "Uncategorized"}
                  </span>
                  <span className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 group-hover:text-purple-700">
                    {product.title}
                  </span>
                  <span className="text-sm text-gray-700">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {products.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No products yet.</p>
      )}
    </div>
  );
}
