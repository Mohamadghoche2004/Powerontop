import { Button } from "@mui/material";

type ButtonComponentProps = {
  text: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

export const ButtonComponent = ({ text, color = "#6366f1", style, className, onClick }: ButtonComponentProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: color,
        "&:hover": {
          backgroundColor: color,
          opacity: 0.9,
        },
        ...style,
      }}
      className={className}
    >
      {text}
    </Button>
  );
};