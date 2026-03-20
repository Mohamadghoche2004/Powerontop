import { useState, useEffect, useMemo } from "react";
import GenericTable from "../../../components/Table/GenericTable";
import { productsConfig } from "./config";
import ProductsFilter from "./ProductsFilterComponent";
import ProductDrawer from "./ProductDrawer";
import type { ProductsTableData } from "../../../types/Product";
import type { CategoriesTableData, CategoryApiResponse } from "../../../types/Category";
import { productsService } from "../../../services/products.service";
import { categoriesService } from "../../../services/categories.service";

export default function Products() {
  const [products, setProducts] = useState<ProductsTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all"); // "all" or category ID
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<ProductsTableData | null>(null);
  const [categories, setCategories] = useState<CategoriesTableData[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = (await categoriesService.getCategories()) as CategoryApiResponse[];
        // Transform categories to match CategoriesTableData format
        const categoryObjects: CategoriesTableData[] = data.map((category: CategoryApiResponse) => ({
          id: category._id,
          name: category.name || "",
          slug: category.slug || "",
        }));
        setCategories(categoryObjects.filter((cat) => cat.name !== ""));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsService.getProducts();
        // Transform API response to match ProductsTableData format
        const transformedProducts: ProductsTableData[] = data.map(
          (product: any) => ({
            id: product._id || product.id,
            title: product.title || "",
            description: product.description || "",
            price: product.price || 0,
            // Handle category - it might be an object with _id or a string ID
            category: product.category.name,
            categoryId: product.category._id,
            images: product.images || [],
          })
        );
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter((product) => product.price >= min);
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((product) => product.price <= max);
      }
    }

    return filtered;
  }, [products, categoryFilter, minPrice, maxPrice]);

  const handleFilterChange = (next: {
    category: string;
    minPrice: string;
    maxPrice: string;
  }) => {
    setCategoryFilter(next.category);
    setMinPrice(next.minPrice);
    setMaxPrice(next.maxPrice);
  };

  const handleFilterClear = () => {
    setCategoryFilter("all");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setDrawerOpen(true);
  };

  const handleEdit = (product: ProductsTableData) => {
    setEditingProduct(product);
    setDrawerOpen(true);
  };

  const handleDelete = async (ids: readonly (string | number)[]) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} product(s)?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        ids.map((id) => productsService.deleteProduct(String(id)))
      );
      // Refetch products
      const data = await productsService.getProducts();
      const transformedProducts: ProductsTableData[] = data.map(
        (product: any) => ({
          id: product._id || product.id,
          title: product.title || "",
          description: product.description || "",
          price: product.price || 0,
          // Handle category - it might be an object with _id or a string ID
          category: product.category.name,
          categoryId: product.category._id,
          images: product.images || [],
        })
      );
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Error deleting products:", error);
      alert("Failed to delete products");
    }
  };

  const handleSubmitProduct = async (data: {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
  }) => {
    if (editingProduct) {
      // Update existing product
      await productsService.updateProduct(editingProduct.id, data);
    } else {
      // Create new product
      await productsService.createProduct(data);
    }

    // Refetch products
    const productsData = await productsService.getProducts();
    const transformedProducts: ProductsTableData[] = productsData.map(
      (product: any) => ({
        id: product._id || product.id,
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        // Handle category - it might be an object with _id or a string ID
        category: product.category.name,
        categoryId: product.category._id,
        images: product.images || [],
      })
    );
    setProducts(transformedProducts);

    // Refetch categories in case a new category was created
    const categoriesData = (await categoriesService.getCategories()) as CategoryApiResponse[];
    const categoryObjects: CategoriesTableData[] = categoriesData.map((category: CategoryApiResponse) => ({
      id: category._id,
      name: category.name || "",
      slug: category.slug || "",
    }));
    setCategories(categoryObjects.filter((cat) => cat.name !== ""));
  };
  // Create config with filter component and handlers
  const config = {
    ...productsConfig,
    filterComponent: (
      <ProductsFilter
        category={categoryFilter}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
        categories={categories}
      />
    ),
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      <GenericTable data={filteredProducts} config={config} />
      <ProductDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSubmit={handleSubmitProduct}
        categories={categories}
      />
    </>
  );
}
