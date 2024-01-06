import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Imagetest from '../assets/images/test1.jpg';

function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Handle form submission logic
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={2}
        md={7}
        sx={{
          backgroundImage: `url(${Imagetest})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
        sx={{ backgroundColor: '#E9D7CC' }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
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
                backgroundColor: '#957461',
                '&:hover': {
                  backgroundColor: '#685043',
                },
              }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: '#be9269',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#685043',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: '#be9269',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#685043',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;
