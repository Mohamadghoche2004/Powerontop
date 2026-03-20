import { useState, useEffect } from "react";
import GenericTable from "../../../components/Table/GenericTable";
import { categoriesConfig } from "./config";
import CategoryDrawer from "./CategoryDrawer";
import type { CategoriesTableData } from "../../../types/Category";
import { categoriesService } from "../../../services/categories.service";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoriesTableData | null>(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesService.getCategories();
        // Transform API response to match CategoriesTableData format
        const transformedCategories: CategoriesTableData[] = data.map(
          (category: any) => ({
            id: category._id || category.id,
            name: category.name || "",
            slug: category.slug || "",
          })
        );
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setDrawerOpen(true);
  };

  const handleEdit = (category: CategoriesTableData) => {
    setEditingCategory(category);
    setDrawerOpen(true);
  };

  const handleDelete = async (ids: readonly (string | number)[]) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} categor${ids.length > 1 ? "ies" : "y"}?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        ids.map((id) => categoriesService.deleteCategory(String(id)))
      );
      // Refetch categories
      const data = await categoriesService.getCategories();
      const transformedCategories: CategoriesTableData[] = data.map(
        (category: any) => ({
          id: category._id || category.id,
          name: category.name || "",
          slug: category.slug || "",
        })
      );
      setCategories(transformedCategories);
    } catch (error) {
      console.error("Error deleting categories:", error);
      alert("Failed to delete categories");
    }
  };

  const handleSubmitCategory = async (data: { name: string }) => {
    if (editingCategory) {
      // Update existing category
      await categoriesService.updateCategory(editingCategory.id, {
        name: data.name,
      });
    } else {
      // Create new category
      await categoriesService.createCategory({ name: data.name });
    }

    // Refetch categories
    const categoriesData = await categoriesService.getCategories();
    const transformedCategories: CategoriesTableData[] = categoriesData.map(
      (category: any) => ({
        id: category._id || category.id,
        name: category.name || "",
        slug: category.slug || "",
      })
    );
    setCategories(transformedCategories);
  };

  // Create config with handlers
  const config = {
    ...categoriesConfig,
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <>
      <GenericTable data={categories} config={config} />
      <CategoryDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSubmit={handleSubmitCategory}
      />
    </>
  );
}
