// components/PurchaseTicket.tsx
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const PurchaseTicket: React.FC = () => {
  return (
    <Paper
      sx={{
        backgroundColor: "#121212",
        color: "white",
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        margin: "auto",
      }}
      elevation={4}
    >
      <Typography variant="h4" gutterBottom color="white">
        Purchase Tickets
      </Typography>
      <Typography variant="h6" gutterBottom color="white">
        Credit Card Information
      </Typography>

      <TextField
        label="Card Number"
        fullWidth
        variant="outlined"
        placeholder="1234 5678 9876 5432"
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
        FormHelperTextProps={{ style: { color: "white" } }}
        inputProps={{ style: { color: "white" } }}
        focused
      />

      <Grid container spacing={2}>
        <Grid>
          <TextField
            label="Expiry Date"
            fullWidth
            variant="outlined"
            placeholder="MM/YY"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
              },
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="CVV"
            fullWidth
            variant="outlined"
            placeholder="123"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
              },
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom color="white">
        Or Pay with:
      </Typography>

      <Grid container spacing={2}>
        <Grid>
          <Button variant="contained" color="primary" sx={{ width: 150 }}>
            Apple Pay
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" sx={{ width: 150 }}>
            Google Pay
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => alert("Proceeding to payment...")}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Paper>
  );
};

export default PurchaseTicket;
