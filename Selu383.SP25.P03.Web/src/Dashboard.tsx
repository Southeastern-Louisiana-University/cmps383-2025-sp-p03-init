import "./App.css";
import { Box } from "@mui/material";
import MovieFetch from "./MoviePage/MovieFetch";
import TheaterDetails from "./TheaterPage/TheaterDetails";

function Dashboard() {
  // HomeScreen.tsx
  return (
    <Box>
      <MovieFetch />
      <TheaterDetails />
    </Box>
  );
}

export default Dashboard;
