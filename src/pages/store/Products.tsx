import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { productsService } from "../../services/products.service";
import { categoriesService } from "../../services/categories.service";
import { VariantPickerModal, type ProductForCart } from "../../components/VariantPickerModal";
import { mapApiProduct } from "../products/mapApiProduct";
import type { ProductsTableData } from "../../types/Product";
import type { CategoriesTableData } from "../../types/Category";

function mapApiCategory(raw: Record<string, unknown>): CategoriesTableData {
  return {
    id: String(raw._id ?? raw.id ?? ""),
    name: String(raw.name ?? ""),
    slug: String(raw.slug ?? ""),
  };
}

export default function Products() {
  const [products, setProducts] = useState<ProductsTableData[]>([]);
  const [categories, setCategories] = useState<CategoriesTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pickerProduct, setPickerProduct] = useState<ProductForCart | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsService.getProducts(),
          categoriesService.getCategories(),
        ]);

        const list = Array.isArray(productsData)
          ? productsData.map((p: Record<string, unknown>) => mapApiProduct(p))
          : [];
        setProducts(list.filter((p) => p.id));

        const cats = Array.isArray(categoriesData)
          ? categoriesData.map((c: Record<string, unknown>) => mapApiCategory(c))
          : [];
        setCategories(cats.filter((c) => c.id));
      } catch {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        categoryFilter === "all" || product.categoryId === categoryFilter;

      if (!query) {
        return matchesCategory;
      }

      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, categoryFilter]);

  const hasActiveFilters = searchQuery.trim() !== "" || categoryFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-600">Shop</h1>
          {!loading && (
            <p className="text-sm text-gray-600 mt-1">
              {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:min-w-[28rem]">
          <div className="relative flex-1">
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="sm:w-48">
            <label htmlFor="shop-category" className="sr-only">
              Filter by category
            </label>
            <select
              id="shop-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {hasActiveFilters && !loading && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-lg bg-purple-50 px-4 py-3 text-sm text-purple-800">
          <span>Filters applied</span>
          <button
            type="button"
            onClick={clearFilters}
            className="font-medium hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {loading && <p className="text-gray-600">Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-600">No products available right now.</p>
      )}

      {!loading && products.length > 0 && filteredProducts.length === 0 && (
        <p className="text-gray-600">No products match your search or filter.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Link to={`/products/${product.id}`}>
              <div className="aspect-square bg-gray-100">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/400?text=No+Image"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <span className="text-xs font-medium text-purple-600">
                {product.category || "Uncategorized"}
              </span>
              <Link to={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold text-gray-800 hover:text-purple-600 mt-1">
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPickerProduct({
                      _id: product.id,
                      title: product.title,
                      price: product.price,
                      images: product.images,
                    });
                  }}
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
