import React, { useState } from "react";
import {
  TableCell,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  imageUrl: string;
}

const ImageModalCell: React.FC<Props> = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableCell
        onClick={handleOpen}
        style={{ cursor: "pointer", color: "#1976d2" }}
      >
        <Typography variant="body2">View Image</Typography>
      </TableCell>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Movie Image</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img
            src={imageUrl}
            alt="Movie"
            style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 8 }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageModalCell;
