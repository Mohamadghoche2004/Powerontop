import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { CategoriesTableData } from "../../../types/Category";

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  category?: CategoriesTableData | null;
  onSubmit: (data: { name: string }) => Promise<void>;
}

export default function CategoryDrawer({
  open,
  onClose,
  category,
  onSubmit,
}: CategoryDrawerProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
    } else {
      // Reset form for new category
      setName("");
    }
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ name: name.trim() });
      onClose();
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 } },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">
            {category ? "Edit Category" : "Add New Category"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Electronics"
            helperText="Slug will be auto-generated from the name"
            sx={{ mb: 3 }}
          />

          {category && (
            <TextField
              fullWidth
              label="Slug"
              value={category.slug || ""}
              disabled
              helperText="Auto-generated slug (read-only)"
              sx={{ mb: 3 }}
            />
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading || !name.trim()}
            >
              {loading ? "Saving..." : category ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}
