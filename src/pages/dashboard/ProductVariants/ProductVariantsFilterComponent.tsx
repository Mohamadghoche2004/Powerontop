import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import type { ProductsTableData } from "../../../types/Product";

export interface ProductVariantsFilterProps {
  productId: string;
  onChange: (next: { productId: string }) => void;
  onClear: () => void;
  onClose?: () => void;
  products?: ProductsTableData[];
}

export default function ProductVariantsFilter({
  productId,
  onChange,
  onClear,
  onClose,
  products = [],
}: ProductVariantsFilterProps) {
  const handleApply = () => onClose?.();

  return (
    <Box sx={{ p: 2, minWidth: 280 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Variant Filters
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Product</InputLabel>
        <Select
          value={productId}
          label="Product"
          onChange={(e) => onChange({ productId: e.target.value })}
        >
          <MenuItem value="all">All Products</MenuItem>
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button size="small" onClick={onClear} color="secondary">
          Clear
        </Button>
        <Button size="small" variant="contained" onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}
