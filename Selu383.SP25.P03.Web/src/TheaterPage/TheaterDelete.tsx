// src/TheaterDeleteForm.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";

const TheaterDeleteForm: React.FC = () => {
  const [id, setId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`https://localhost:7027/api/theaters/${id}`);
      setSuccess("Theater deleted successfully.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete theater. Please check the ID.");
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleDelete}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" textAlign="center">
          Delete Theater
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Theater ID"
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </Container>
  );
};

export default TheaterDeleteForm;
