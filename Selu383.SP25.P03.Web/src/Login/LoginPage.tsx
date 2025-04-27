// src/LoginForm.tsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";

interface AuthenticationPost {
  username: string;
  password: string;
}

interface AuthenticationFetch {
  token: string;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      setSuccess("");
      return;
    }

    const credentials: AuthenticationPost = { username, password };

    try {
      const response = await axios.post<AuthenticationFetch>(
        "/api/authentication/login",
        credentials
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      setSuccess("Login successful!");
      setError("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#121212",
          color: "white",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4" textAlign="center" color="white">
            Login
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#90caf9",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#90caf9",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />

          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
