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

import Imagetest from "../assets/images/test1.jpg";

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL,
  import.meta.env.VITE_REACT_APP_SUPABASE_PUBLIC_KEY
);

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value.trim(),
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      alert("Check your email for verification");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={2}
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
          <Avatar s sx={{ m: 1, width: 80, height: 80 }}  src="https://cdn.discordapp.com/attachments/1140959205986148372/1182970787058171924/words.png?ex=65a251e6&is=658fdce6&hm=c35868b3947f2f328a5cbd2f5f9ea562303ace8ec82c6c0189867fd672f0ba89&" />
          <Typography component="h1" variant="h5"  fontFamily='monospace'>
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
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
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
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
      </Grid>
    </Grid>
  );
}

export default SignUp;
