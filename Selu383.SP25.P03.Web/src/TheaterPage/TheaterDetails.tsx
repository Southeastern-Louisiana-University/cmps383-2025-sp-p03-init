import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Theater } from "../types"; // Assuming you have the Theater type

// Define a default theater object for creating new theaters
const defaultTheater: Theater = {
  id: 0,
  name: "",
  address: "",
  seatCount: 0,
};

const TheaterTableWithCRUD: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTheater, setEditingTheater] = useState<Theater>(defaultTheater);

  // Fetch theaters from the API
  const fetchTheaters = async () => {
    const res = await axios.get<Theater[]>(
      "https://localhost:7027/api/theaters/"
    );
    setTheaters(res.data);
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  // Handle input change for the dialog form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingTheater((prev) => ({
      ...prev,
      [name]: name === "seatCount" ? Number(value) : value, // Ensure capacity is treated as a number
    }));
  };

  // Save (create or update) the theater data
  const handleSave = async () => {
    if (editingTheater.id === 0) {
      // Create new theater
      await axios.post("https://localhost:7027/api/theaters/", editingTheater);
    } else {
      // Update existing theater
      await axios.put(
        `https://localhost:7027/api/theaters/${editingTheater.id}`,
        editingTheater
      );
    }
    setOpenDialog(false);
    setEditingTheater(defaultTheater); // Reset the form after saving
    fetchTheaters(); // Refresh the theater list
  };

  // Handle deletion of a theater
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this theater?")) {
      await axios.delete(`https://localhost:7027/api/theaters/${id}`);
      fetchTheaters(); // Refresh the list after deletion
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Theaters</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Seat Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {theaters.map((theater) => (
              <TableRow key={theater.id}>
                <TableCell>{theater.id}</TableCell>
                <TableCell>{theater.name}</TableCell>
                <TableCell>{theater.address}</TableCell>
                <TableCell>{theater.seatCount}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Theater">
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setEditingTheater(theater);
                        setOpenDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Theater">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(theater.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Theater Button */}
      <Tooltip title="Add Theater">
        <IconButton
          color="primary"
          onClick={() => {
            setEditingTheater(defaultTheater); // Reset to default for new theater
            setOpenDialog(true); // Open the dialog
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      {/* Create / Update Modal */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingTheater.id === 0 ? "Create Theater" : "Update Theater"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            name="name"
            label="Theater Name"
            value={editingTheater.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            name="address"
            label="Address"
            value={editingTheater.address}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            name="seatCount"
            label="Seat Count"
            type="number"
            value={editingTheater.seatCount}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TheaterTableWithCRUD;
