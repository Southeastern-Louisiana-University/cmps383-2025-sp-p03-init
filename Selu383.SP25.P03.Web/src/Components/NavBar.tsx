import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Typography } from "@mui/material";
import TheaterLocation from "./TheaterLocation";

function ResponsiveAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#d8b4fe", color: "black" }}
      elevation={4}
    >
      <Toolbar disableGutters sx={{ width: "100vw" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src="logo.png" // Placeholder logo
              alt="Company Logo"
              style={{ maxWidth: "100px", height: "auto" }}
            />
          </Box>
          <Button onClick={() => navigate("/")} color="inherit">
            Home
          </Button>
          <Typography variant="h6">Lion's Den Cinemas</Typography>
          <TheaterLocation />
          <Button onClick={() => navigate("/login")} color="inherit">
            Sign Up
          </Button>
          <Avatar
            alt="Profile Picture"
            src="https://via.placeholder.com/40" // Placeholder profile picture
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
