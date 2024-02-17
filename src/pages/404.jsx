import React from 'react';
import { Container, Typography } from '@mui/material';
import NotFoundImage from '../assets/images/404bg.png';

const NotFound = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={NotFoundImage}
        alt="404"
        style={{
          width: '40%',
          marginBottom: '20px',
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          fontSize: '2.5rem', // Adjust font size
          fontWeight: 'bold', // Make the text bold
          marginTop: '20px', // Add margin at the top
        }}
      >
        Page Not Found
      </Typography>
    </Container>
  );
};

export default NotFound;
