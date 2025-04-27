import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Theater } from "../types";
import { CircularProgress, Typography, Box } from "@mui/material";
import MovieCarousel from "../Components/MovieCarousel";

const TheaterPage = () => {
  const { id } = useParams<{ id: string }>();
  const [theater, setTheater] = useState<Theater | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7027/api/theaters/${id}`
        );
        setTheater(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchTheater();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!theater) return <Typography>No theater found.</Typography>;

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        marginTop: 6, // Added margin-top to push the content below the navbar
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Adjusted to start the content from the top
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "1200px", // Limit max width to prevent stretching
        marginLeft: "auto", // Center content horizontally
        marginRight: "auto", // Center content horizontally
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        {theater.name}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Address: {theater.address}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Seats Available: {theater.seatCount}
      </Typography>
      <MovieCarousel />
    </Box>
  );
};

export default TheaterPage;
