import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { productVariantsService } from "../../services/productVariants.service";
import { useCart } from "../../context/CartContext";

export interface ProductForCart {
  _id: string;
  title: string;
  price: number;
  images?: string[];
}

interface VariantApi {
  _id: string;
  size: string;
  color: string;
  stock: number;
  extraPrice: number;
  product?: string | { _id: string; price?: number };
}

interface VariantPickerModalProps {
  open: boolean;
  onClose: () => void;
  product: ProductForCart | null;
}

export const VariantPickerModal = ({ open, onClose, product }: VariantPickerModalProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [variants, setVariants] = useState<VariantApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !product) return;

    const load = async () => {
      setLoading(true);
      setError("");
      setSelectedId("");
      try {
        const data = await productVariantsService.getVariants(product._id);
        setVariants(data);
        if (data.length === 1 && data[0].stock > 0) {
          setSelectedId(data[0]._id);
        }
      } catch {
        setError("Failed to load product options.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [open, product]);

  const selected = variants.find((v) => v._id === selectedId);

  const handleAdd = () => {
    if (!product || !selected) return;
    if (selected.stock < 1) {
      setError("This option is out of stock.");
      return;
    }

    const unitPrice = product.price + (selected.extraPrice ?? 0);
    addItem(
      {
        productVariantId: selected._id,
        productId: product._id,
        title: product.title,
        size: selected.size,
        color: selected.color,
        unitPrice,
        image: product.images?.[0],
        maxStock: selected.stock,
      },
      1
    );
    onClose();
    navigate("/cart");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{product ? `Add ${product.title}` : "Select options"}</DialogTitle>
      <DialogContent>
        {loading && (
          <div className="flex justify-center py-6">
            <CircularProgress size={32} />
          </div>
        )}
        {!loading && variants.length === 0 && (
          <Typography color="text.secondary">No variants available for this product.</Typography>
        )}
        {!loading && variants.length > 0 && (
          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <InputLabel>Size & color</InputLabel>
            <Select
              label="Size & color"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              MenuProps={{ disablePortal: true }}
            >
              {variants.map((v) => (
                <MenuItem key={v._id} value={v._id} disabled={v.stock < 1}>
                  {v.size} / {v.color} — ${(product!.price + v.extraPrice).toFixed(2)}
                  {v.stock < 1 ? " (Out of stock)" : ` (${v.stock} left)`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!selected || selected.stock < 1}
          sx={{ bgcolor: "#9810fa", "&:hover": { bgcolor: "#7a0dc8" } }}
        >
          Add to cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};
