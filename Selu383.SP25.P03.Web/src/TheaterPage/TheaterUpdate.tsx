import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Theater } from "../types";

const TheaterUpdateForm: React.FC = () => {
  const [form, setForm] = useState<Theater>({
    id: 0,
    name: "",
    address: "",
    seatCount: 0,
  });

  const [id, setId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "seatCount" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://localhost:7027/api/theaters/${id}`,
        form
      );
      setSuccess("Theater updated successfully!");
      setError("");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to update. Please make sure the ID exists.");
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" textAlign="center">
          Update Existing Theater
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
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Address"
          name="address"
          multiline
          rows={3}
          value={form.address}
          onChange={handleChange}
          required
        />
        <TextField
          label="Seat Count"
          name="seatCount"
          type="number"
          value={form.seatCount}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Update Theater
        </Button>
      </Box>
    </Container>
  );
};

export default TheaterUpdateForm;
