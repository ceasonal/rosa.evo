import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Replace these with your own social media URLs
const socialMediaLinks = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#957461',
        color: '#ffffff',
        py: { xs: 2, sm: 3 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ color: '#ffffff' }}>
              rosa.evo
            </Typography>
            {/* Add your logo component or image here */}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ color: '#ffffff' }}>
              PRODUCT
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block">
              Features
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Integrations
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Pricing
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              FAQ
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ color: '#ffffff' }}>
              COMPANY
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Careers
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ color: '#ffffff' }}>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: { xs: 2, sm: 4 }, color: '#ffffff', md: 10 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
