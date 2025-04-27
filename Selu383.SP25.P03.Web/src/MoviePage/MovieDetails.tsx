// components/MovieDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Movie } from "../types";

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch(`https://localhost:7027/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Failed to fetch movie:", err));
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box p={4} m={10}>
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>
      <img
        src={movie.imageUrl}
        alt={movie.title}
        style={{ maxWidth: "100%" }}
      />
      <Typography>{movie.description}</Typography>
      <Typography>
        <strong>Genre:</strong> {movie.genre}
      </Typography>
      <Typography>
        <strong>Runtime:</strong> {movie.runtimeMinutes} minutes
      </Typography>
      <Typography>
        <strong>Rating:</strong> {movie.rating}
      </Typography>

      {/* Grid for the buttons */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Button for Seat Count */}
        <Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate(`/seatcount/${id}`)} // Navigate to seat count page
          >
            View Seat Count
          </Button>
        </Grid>

        {/* Button for Purchase Ticket */}
        <Grid>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate(`/purchase/${id}`)} // Navigate to purchase ticket page
          >
            Purchase Ticket
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MovieDetail;
