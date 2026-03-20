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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ProductVariantsTableData } from "../../../types/ProductVariant";
import type { ProductsTableData } from "../../../types/Product";

interface ProductVariantDrawerProps {
  open: boolean;
  onClose: () => void;
  variant?: ProductVariantsTableData | null;
  products?: ProductsTableData[];
  onSubmit: (data: {
    product: string;
    size: string;
    color: string;
    sku: string;
    stock: number;
    extraPrice: number;
  }) => Promise<void>;
}

export default function ProductVariantDrawer({
  open,
  onClose,
  variant,
  products = [],
  onSubmit,
}: ProductVariantDrawerProps) {
  const [productId, setProductId] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variant) {
      setProductId(variant.product || "");
      setSize(variant.size || "");
      setColor(variant.color || "");
      setSku(variant.sku || "");
      setStock(String(variant.stock ?? ""));
      setExtraPrice(String(variant.extraPrice ?? ""));
    } else {
      setProductId("");
      setSize("");
      setColor("");
      setSku("");
      setStock("");
      setExtraPrice("");
    }
  }, [variant, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !size || !color || !sku) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        product: productId,
        size,
        color,
        sku,
        stock: parseInt(stock) || 0,
        extraPrice: parseFloat(extraPrice) || 0,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting variant:", error);
      alert("Failed to save variant");
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
        sx: { width: { xs: "100%", sm: 450 } },
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
            {variant ? "Edit Variant" : "Add New Variant"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Product</InputLabel>
            <Select
              value={productId}
              label="Product"
              onChange={(e) => setProductId(e.target.value)}
              required
              disabled={!!variant}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            placeholder="e.g., TSHIRT-M-BLK"
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              placeholder="e.g., M, L, XL"
            />
            <TextField
              fullWidth
              label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              placeholder="e.g., Black"
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              inputProps={{ min: "0" }}
              required
            />
            <TextField
              fullWidth
              label="Extra Price"
              type="number"
              value={extraPrice}
              onChange={(e) => setExtraPrice(e.target.value)}
              inputProps={{ step: "0.01", min: "0" }}
              helperText="Added to base product price"
            />
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
              disabled={loading}
            >
              {loading ? "Saving..." : variant ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}
