import { useState, useEffect, useMemo } from "react";
import GenericTable from "../../../components/Table/GenericTable";
import { productVariantsConfig } from "./config";
import ProductVariantsFilter from "./ProductVariantsFilterComponent";
import ProductVariantDrawer from "./ProductVariantDrawer";
import type {
  ProductVariantsTableData,
  ProductVariantApiResponse,
} from "../../../types/ProductVariant";
import type { ProductsTableData } from "../../../types/Product";
import { productVariantsService } from "../../../services/productVariants.service";
import { productsService } from "../../../services/products.service";

function transformVariant(
  variant: ProductVariantApiResponse
): ProductVariantsTableData {
  let productId = "";
  let productTitle = "";
  if (typeof variant.product === "object" && variant.product !== null) {
    productId = variant.product._id;
    productTitle = variant.product.title;
  } else {
    productId = variant.product;
    productTitle = variant.product;
  }

  return {
    id: variant._id,
    product: productId,
    productTitle,
    size: variant.size || "",
    color: variant.color || "",
    sku: variant.sku || "",
    stock: variant.stock ?? 0,
    extraPrice: variant.extraPrice ?? 0,
  };
}

export default function ProductVariants() {
  const [variants, setVariants] = useState<ProductVariantsTableData[]>([]);
  const [products, setProducts] = useState<ProductsTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [productFilter, setProductFilter] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingVariant, setEditingVariant] =
    useState<ProductVariantsTableData | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await productsService.getProducts();
      const transformed: ProductsTableData[] = data.map((product: any) => ({
        id: product._id || product.id,
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        category: product.category?.name || product.category || "",
        categoryId: product.category?._id || product.category?.id || "",
        images: product.images || [],
      }));
      setProducts(transformed);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const data: ProductVariantApiResponse[] =
        await productVariantsService.getVariants();
      setVariants(data.map(transformVariant));
    } catch (error) {
      console.error("Error fetching variants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchProducts();
  }, []);

  const filteredVariants = useMemo(() => {
    if (productFilter === "all") return variants;
    return variants.filter((v) => v.product === productFilter);
  }, [variants, productFilter]);

  const handleFilterChange = (next: { productId: string }) => {
    setProductFilter(next.productId);
  };

  const handleFilterClear = () => {
    setProductFilter("all");
  };

  const handleAdd = () => {
    setEditingVariant(null);
    setDrawerOpen(true);
  };

  const handleEdit = (variant: ProductVariantsTableData) => {
    setEditingVariant(variant);
    setDrawerOpen(true);
  };

  const handleDelete = async (ids: readonly (string | number)[]) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} variant(s)?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        ids.map((id) => productVariantsService.deleteVariant(String(id)))
      );
      await fetchVariants();
    } catch (error) {
      console.error("Error deleting variants:", error);
      alert("Failed to delete variants");
    }
  };

  const handleSubmitVariant = async (data: {
    product: string;
    size: string;
    color: string;
    sku: string;
    stock: number;
    extraPrice: number;
  }) => {
    if (editingVariant) {
      await productVariantsService.updateVariant(editingVariant.id, {
        size: data.size,
        color: data.color,
        sku: data.sku,
        stock: data.stock,
        extraPrice: data.extraPrice,
      });
    } else {
      await productVariantsService.createVariant(data);
    }
    await fetchVariants();
  };

  const config = {
    ...productVariantsConfig,
    filterComponent: (
      <ProductVariantsFilter
        productId={productFilter}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
        products={products}
      />
    ),
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  if (loading) {
    return <div>Loading product variants...</div>;
  }

  return (
    <>
      <GenericTable data={filteredVariants} config={config} />
      <ProductVariantDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingVariant(null);
        }}
        variant={editingVariant}
        products={products}
        onSubmit={handleSubmitVariant}
      />
    </>
  );
}
