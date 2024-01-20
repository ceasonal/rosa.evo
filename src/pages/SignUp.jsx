import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Imagetest from "../assets/images/test1.jpg";
const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL,
  import.meta.env.VITE_REACT_APP_SUPABASE_PUBLIC_KEY
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value.trim(),
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
  
    // Simple form validation
    let formIsValid = true;
    const newErrors = { ...errors };
  
    if (!formData.name) {
      newErrors.name = "Name is required";
      formIsValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers";
      formIsValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = "Name should not exceed 50 characters";
      formIsValid = false;
    }
  
    if (!formData.email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not in a valid format";
      formIsValid = false;
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      formIsValid = false;
    }
  
    setErrors(newErrors);
  
    if (!formIsValid) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fix the errors in the form.");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      // Check if email is already in use with Supabase
      const { data, error } = await supabase.auth.signInWithOtp({
        email: formData.email,
      });
  
      if (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("An error occurred while checking the email.");
        setOpenSnackbar(true);
        return;
      }
  
      if (data.length > 0) {
        // Email is already registered
  
        // Check if the email is verified
        const isEmailVerified = data[0].email_verified;
  
        if (isEmailVerified) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Email is already in use and verified.");
          setOpenSnackbar(true);
        } else {
          const { user, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          });
  
          if (error) {
            setSnackbarSeverity("error");
            setSnackbarMessage(error.message);
            setOpenSnackbar(true);
            return;
          }
  
          if (user) {
            const { error } = await supabase.from("users").insert([
              {
                id: user.id,
                name: formData.name,
                email: formData.email,
              },
            ]);
  
            if (error) {
              setSnackbarSeverity("error");
              setSnackbarMessage(error.message);
              setOpenSnackbar(true);
              return;
            }
  
            setSnackbarSeverity("success");
            setSnackbarMessage("Account created successfully!");
            setOpenSnackbar(true);
          }
        }
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  }
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
          backgroundColor: "#E9D7CC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <Avatar
            sx={{ m: 1, width: 80, height: 80 }}
            src="https://cdn.discordapp.com/attachments/1140959205986148372/1182970787058171924/words.png?ex=65a251e6&is=658fdce6&hm=c35868b3947f2f328a5cbd2f5f9ea562303ace8ec82c6c0189867fd672f0ba89&"
          />
          <Typography component="h1" variant="h5" fontFamily="monospace">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                error={Boolean(errors.name)}
                helperText={errors.name}
                onChange={handleChange}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#957461",
                "&:hover": {
                  backgroundColor: "#685043",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
          <Link
            href="#/signin"
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
            {"Already have an account? Sign In"}
          </Link>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default SignUp;
