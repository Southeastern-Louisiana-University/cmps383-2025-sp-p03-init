import { useState, useEffect } from "react";
import axios from "axios";
import { Theater } from "../types"; // Import the Theater type
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TheaterList = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<number>(0);
  const [, setLoading] = useState(false);
  const [, setVisible] = useState(false); // Controls visibility
  const navigate = useNavigate();

  const fetchTheaters = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7027/api/theaters/");
      setTheaters(response.data); // Store API data in state
      setVisible(true); // Show the data when fetched
    } catch (error) {
      console.error("Error fetching theaters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters(); // Call fetchTheaters on component mount
  }, []); // Empty dependency array to call only once when the component mounts

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedTheater(event.target.value as number); // Update selected theater ID
  };

  const handleSubmit = () => {
    if (selectedTheater) {
      navigate(`https://localhost:7027/api/theaters/${selectedTheater}`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://wallpaperbat.com/img/23094-cinema-hd-wallpaper-top-free-cinema-hd-background.jpg)`,
        backgroundSize: "cover", // Ensures the background image covers the whole container
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the background from repeating
        width: "100vw", // Ensures the container takes up the full viewport width
        height: "100vh", // Ensures the container takes up the full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <h1>Theaters</h1>
      <div>
        <h2>Please select your theater!</h2>
        <FormControl fullWidth>
          <InputLabel id="select-theater-label" sx={{ color: "white" }}>
            Select Theater
          </InputLabel>
          <Select
            labelId="select-theater-label"
            value={selectedTheater}
            onChange={handleChange}
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            {theaters.map((theater) => (
              <MenuItem key={theater.id} value={theater.id}>
                {theater.name} - {theater.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          disabled={!selectedTheater}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TheaterList;
