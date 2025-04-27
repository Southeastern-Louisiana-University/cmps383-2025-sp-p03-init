// src/TheaterPostForm.tsx
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

const TheaterPostForm: React.FC = () => {
  const [form, setForm] = useState<Theater>({
    id: 0, // Default id value
    name: "",
    address: "",
    seatCount: 0,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "seatCount" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7027/api/theaters/",
        form
      );
      setSuccess("Theater post created successfully!");
      setError("");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to post. Please try again.");
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
          Create a New Theater Location
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

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
          value={form.seatCount}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default TheaterPostForm;
