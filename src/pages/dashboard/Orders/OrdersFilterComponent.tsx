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

export interface OrdersFilterProps {
  status: string;
  onChange: (next: { status: string }) => void;
  onClear: () => void;
  onClose?: () => void;
}

export default function OrdersFilter({
  status,
  onChange,
  onClear,
  onClose,
}: OrdersFilterProps) {
  const handleApply = () => onClose?.();

  return (
    <Box sx={{ p: 2, minWidth: 280 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Filters
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => onChange({ status: e.target.value })}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
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
