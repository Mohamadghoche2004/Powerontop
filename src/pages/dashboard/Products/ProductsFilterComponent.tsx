import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import type { CategoriesTableData } from "../../../types/Category";

export interface ProductsFilterProps {
  category: string;
  minPrice: string;
  maxPrice: string;
  onChange: (next: {
    category: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
  onClear: () => void;
  onClose?: () => void;
  categories?: CategoriesTableData[];
}

export default function ProductsFilter({
  category,
  minPrice,
  maxPrice,
  onChange,
  onClear,
  onClose,
  categories = [],
}: ProductsFilterProps) {
  const handleApply = () => onClose?.();

  return (
    <Box sx={{ p: 2, minWidth: 280 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Product Filters
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) =>
            onChange({ category: e.target.value, minPrice, maxPrice })
          }
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        size="small"
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) =>
          onChange({ category, minPrice: e.target.value, maxPrice })
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        size="small"
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) =>
          onChange({ category, minPrice, maxPrice: e.target.value })
        }
        sx={{ mb: 2 }}
      />

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
