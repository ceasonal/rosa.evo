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
console.log(window.location)

  
  return (
    <Box sx={containerStyle}>
      <img
        src="https://media.tenor.com/8CRuK01WKcMAAAAi/pokemon-pikachu.gif"
        alt="Pikachu gif"
        style={imageStyle}
      />
        {/* <img src='https://cdn.discordapp.com/attachments/1140959205986148372/1183384642246680647/iii-removebg-preview.png?ex=65bf82d4&is=65ad0dd4&hm=87b5ee369c74d1e9c0a27153b22c803b3acfe369e11f7d2dfe5710aba911c00b&' alt='' style={imageStyle}/> */}
      <Typography variant="h5" gutterBottom sx={{...textStyle, fontFamily:'monospace'}}>
        Welcome to the admin page! Here you can manage all of your products and view orders. Get started by clicking on the buttons in the side bar.
      </Typography>
    </Box>
  );
};

export default AdminWelcome;
