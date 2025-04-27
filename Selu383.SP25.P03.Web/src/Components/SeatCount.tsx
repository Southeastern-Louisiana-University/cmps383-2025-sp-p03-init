import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const SeatSelection: React.FC = () => {
  const totalSeats = 50; // Total number of seats
  const rows = 5; // Number of rows
  const cols = 10; // Number of columns

  // State to track the hovered seat
  const [hoveredSeat, setHoveredSeat] = useState<number | null>(null);

  // Handle mouse enter on a seat
  const handleMouseEnter = (seatId: number) => {
    setHoveredSeat(seatId);
  };

  // Handle mouse leave from a seat
  const handleMouseLeave = () => {
    setHoveredSeat(null);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Cinema Room (50 Seats)
      </Typography>

      {/* Movie Screen */}
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">🎬 Movie Screen 🎬</Typography>
      </Box>

      {/* Seat Grid */}
      <Grid container spacing={10} sx={{ justifyContent: "center", m: 5 }}>
        {Array.from({ length: totalSeats }).map((_, index) => {
          const seatNumber = index + 1; // Seat number from 1 to 50
          const row = Math.floor(index / cols);
          const col = index % cols;

          // Check if it's an exit seat in the last row (at the back)
          const isExitRow = row === rows - 1;
          const isExitSeat = col === Math.floor(cols / 2); // Exit in the middle seat

          return (
            <Grid key={index}>
              {isExitRow && isExitSeat ? (
                // Exit Symbol
                <Paper
                  sx={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ff6f61", // Exit color
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#ff5733", // Hover exit color
                    },
                  }}
                >
                  <Typography variant="body2">🚪</Typography>{" "}
                  {/* Exit symbol */}
                </Paper>
              ) : (
                <Paper
                  sx={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      hoveredSeat === seatNumber ? "#d8b4fe" : "#e0e0e0",
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#d8b4fe",
                    },
                  }}
                  onMouseEnter={() => handleMouseEnter(seatNumber)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Typography variant="body2">{seatNumber}</Typography>
                </Paper>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SeatSelection;
