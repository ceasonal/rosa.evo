import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const AdminWelcome = () => {
  const containerStyle = {
    textAlign: 'center',
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    marginTop: '50px',
  };

  const imageStyle = {
    width: '20%',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const textStyle = {
    marginBottom: '20px',
  };
  
  return (
    <Box sx={containerStyle}>
      {/* <img
        src="https://media.tenor.com/8CRuK01WKcMAAAAi/pokemon-pikachu.gif"
        alt="Pikachu gif"
        style={imageStyle}
      /> */}
        <img src='https://i.ibb.co/7Kq2xhY/iii-removebg-preview.png' alt='' style={imageStyle}/>
      <Typography variant="h5" gutterBottom sx={{...textStyle, fontFamily:'monospace'}}>
        Welcome to the user profile page! Here you can manage your user details and view your order history. Get started by clicking on the buttons in the side bar.
      </Typography>
    </Box>
  );
};

export default AdminWelcome;
