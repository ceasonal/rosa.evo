import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Imagetest from "../assets/images/test.jpg";
import supabase from '../assets/config/SupabaseClient';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// const supabase = createClient(
//   import.meta.env.VITE_REACT_APP_SUPABASE_URL,
//   import.meta.env.VITE_REACT_APP_SUPABASE_PUBLIC_KEY
// );

const SignInSide = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      setToken(data);
      navigate("/");
    } catch (error) {
      console.error("Sign In Error:", error);
      setError(error.message || "An error occurred during sign in");
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
        sx={{ backgroundColor: "#E9D7CC" }}
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
          <Avatar sx={{ m: 1 }}>
            <img
              src="https://cdn.discordapp.com/attachments/1140959205986148372/1182970787058171924/words.png?ex=65a251e6&is=658fdce6&hm=c35868b3947f2f328a5cbd2f5f9ea562303ace8ec82c6c0189867fd672f0ba89&"
              alt=""
              width={80}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
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
              Sign In
            </Button>
            <Grid container spacing={1}>
              <Grid item xs>
                <Link
                  href="#/"
                  variant="body2"
                  sx={{
                    color: "#be9269",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#685043",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#/signup"
                  variant="body2"
                  sx={{
                    color: "#be9269",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#685043",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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
            severity="error"
          >
            {error}
          </MuiAlert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
