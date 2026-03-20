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

export interface UsersFilterProps {
  role: string;
  onChange: (next: { role: string }) => void;
  onClear: () => void;
  onClose?: () => void;
}

export default function UsersFilter({
  role,
  onChange,
  onClear,
  onClose,
}: UsersFilterProps) {
  const handleApply = () => onClose?.();

  return (
    <Box sx={{ p: 2, minWidth: 280 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        User Filters
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => onChange({ role: e.target.value })}
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
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


