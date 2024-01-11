import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link }from "@mui/material"
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Imagetest from "../assets/images/test.jpg";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL,
  import.meta.env.VITE_REACT_APP_SUPABASE_PUBLIC_KEY
);
const SignInSide = ({setToken}) => {
  let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
  })
  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }
async function handleSubmit(e){
    e.preventDefault()

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
      setToken(data)
      console.log(data)
      navigate('/')


    //   alert('Check your email for verification link')

      
    } catch (error) {
      alert(error)
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
            sx={{ mt: 1 }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#957461',
                  },
                  '&:hover fieldset': {
                    borderColor: '#685043',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#685043',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#685043',
                },
                '& .MuiInputBase-input': {
                  color: '#462b1c',
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#957461',
                  },
                  '&:hover fieldset': {
                    borderColor: '#685043',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#685043',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#685043',
                },
                '& .MuiInputBase-input': {
                  color: '#462b1c',
                },
              }}
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="#/"
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
                  style={{
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
      </Grid>
    </Grid>
  );
}

export default SignInSide;