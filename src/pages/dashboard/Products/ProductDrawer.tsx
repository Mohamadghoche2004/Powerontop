import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ProductsTableData } from "../../../types/Product";
import type { CategoriesTableData } from "../../../types/Category";
import { StyledUploadZone } from "../../../components/StyledUploadZone/StyledUploadZone";
import { uploadService } from "../../../services/upload.service";

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  product?: ProductsTableData | null;
  onSubmit: (data: {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
  }) => Promise<void>;
  categories?: CategoriesTableData[];
}

export default function ProductDrawer({
  open,
  onClose,
  product,
  onSubmit,
  categories = [],
}: ProductDrawerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
console.log("categories",categories);
console.log("product",product);
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setPrice(String(product.price || ""));
      setCategory(product.categoryId || "");
      setImages(product.images || []);
    } else {
      // Reset form for new product
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImages([]);
      setSelectedFile(null);
    }
  }, [product, open]);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setUploading(true);
    try {
      const url = await uploadService.uploadImage(file);
      setImages((prev) => [...prev, url]);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveUploadedFile = () => {
    setSelectedFile(null);
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];
    setImages(images.filter((_, i) => i !== index));
    // Try to delete from Supabase storage (non-blocking)
    try {
      await uploadService.deleteImage(imageUrl);
    } catch (error) {
      console.error("Error deleting image from storage:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !category) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title,
        description,
        price: parseFloat(price),
        category,
        images,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to save product");
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
        sx: { width: { xs: "100%", sm: 500 } },
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
            {product ? "Edit Product" : "Add New Product"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            inputProps={{ step: "0.01", min: "0" }}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <StyledUploadZone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemoveFile={handleRemoveUploadedFile}
              title="Product Image"
              dragText="Drag & drop a product image here, or click to select"
            />
            {uploading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="textSecondary">
                  Uploading image...
                </Typography>
              </Box>
            )}
            {images.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Uploaded Images ({images.length})
                </Typography>
                <Stack spacing={1}>
                  {images.map((url, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                      }}
                    >
                      <img
                        src={url}
                        alt={`Product image ${index + 1}`}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Image {index + 1}
                      </Typography>
                      <Chip
                        label="Remove"
                        size="small"
                        onDelete={() => handleRemoveImage(index)}
                        color="error"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>

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
              disabled={loading || uploading}
            >
              {loading ? "Saving..." : uploading ? "Uploading..." : product ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}
