import Button from "@mui/material/Button";

interface ButtonUsageProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function ButtonUsage({
  onClick,
  disabled,
  children,
}: ButtonUsageProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
