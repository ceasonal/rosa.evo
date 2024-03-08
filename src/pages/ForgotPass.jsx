import * as React from "react";
import { useState } from "react";
import Imagetest from "../assets/images/test.jpg";
import AvImage from "../assets/images/prod-images/words.png";
import supabase from "../assets/config/SupabaseClient";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Forgotpass = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showAdditionalText, setShowAdditionalText] = useState(false);

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );

      if (error) throw error;

      setSnackbarSeverity("success");
      setSnackbarMessage("Password reset email sent!");
      setOpenSnackbar(true);
      setShowAdditionalText(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error.error_description || error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Imagetest})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "#f5f5ef",
          backgroundImage: "linear-gradient(62deg, #f5f5ef 0%, #e9d7cc 100%);",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, width: 80, height: 80 }} src={AvImage} />
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                backgroundColor: "#957461",
                "&:hover": {
                  backgroundColor: "#685043",
                },
              }}
            >
              Reset Password
            </Button>
            {showAdditionalText && (
              <Typography variant="body2" color="textSecondary" align="center">
                If your email matches an existing account, we will send you a
                recovery email within a few minutes. If you have not received
                your email, check your spam folder.
              </Typography>
            )}
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Forgotpass;
