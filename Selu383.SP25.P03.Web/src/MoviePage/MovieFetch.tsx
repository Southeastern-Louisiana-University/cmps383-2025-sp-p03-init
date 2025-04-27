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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  description: string;
  runtimeMinutes: number;
  imageUrl: string;
}

const defaultMovie: Movie = {
  id: 0,
  title: "",
  genre: "",
  rating: "",
  description: "",
  runtimeMinutes: 0,
  imageUrl: "",
};

const MovieTableWithCRUD: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie>(defaultMovie);

  const fetchMovies = async () => {
    const res = await axios.get<Movie[]>("https://localhost:7027/api/movies");
    setMovies(res.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingMovie((prev) => ({
      ...prev,
      [name]: name === "runtimeMinutes" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (editingMovie.id === 0) {
      await axios.post("https://localhost:7027/api/movies", editingMovie);
    } else {
      await axios.put(
        `https://localhost:7027/api/movies/${editingMovie.id}`,
        editingMovie
      );
    }
    setOpenDialog(false);
    setEditingMovie(defaultMovie);
    fetchMovies();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await axios.delete(`/api/movies/${id}`);
      fetchMovies();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensure it takes full height of the screen
        overflow: "hidden", // Hide unnecessary scroll
      }}
    >
      <Container sx={{ mt: 4, width: "100%", maxWidth: "lg" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Movies</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingMovie(defaultMovie);
              setOpenDialog(true);
            }}
          >
            Add Movie
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Runtime</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell>{movie.rating}</TableCell>
                  <TableCell>{movie.runtimeMinutes} min</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setEditingMovie(movie);
                          setOpenDialog(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(movie.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create / Update Modal */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingMovie.id === 0 ? "Create Movie" : "Update Movie"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              name="title"
              label="Title"
              value={editingMovie.title}
              onChange={handleInputChange}
            />
            <TextField
              name="genre"
              label="Genre"
              value={editingMovie.genre}
              onChange={handleInputChange}
            />
            <TextField
              name="rating"
              label="Rating"
              value={editingMovie.rating}
              onChange={handleInputChange}
            />
            <TextField
              name="description"
              label="Description"
              multiline
              rows={2}
              value={editingMovie.description}
              onChange={handleInputChange}
            />
            <TextField
              name="runtimeMinutes"
              label="Runtime (min)"
              type="number"
              value={editingMovie.runtimeMinutes}
              onChange={handleInputChange}
            />
            <TextField
              name="imageUrl"
              label="Image URL"
              value={editingMovie.imageUrl}
              onChange={handleInputChange}
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
    </Box>
  );
};

export default MovieTableWithCRUD;
