import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Replace these with your own social media URLs
const socialMediaLinks = {
  facebook: "#",
  twitter: "#",
  instagram: "#",
};

const Footer = () => {
  const handleAboutClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box
      sx={{
        bgcolor: "#957461",
        color: "#ffffff",
        py: { xs: 2, sm: 3 },
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Box  alignItems="center"  justifyContent="center">
              <img
                src="https://media.discordapp.net/attachments/1140959205986148372/1183384642246680647/iii-removebg-preview.png?ex=65e46cd4&is=65d1f7d4&hm=b53ba1f3bdbdc330d7de85227c8bfc94e570de337c2d807074baab9548281dc5&=&format=webp&quality=lossless&width=322&height=473"
                alt="RosaEvo"
                style={{ maxWidth: "10%", height: "auto" }}
              />
              <Typography variant="h6" component="div">
                RosaEvo
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Link href="/" sx={{
                    color: "#ffffff",
                    textDecoration: "none",
                    mr:4,
                    "&:hover": {
                      fontWeight:'bold',
                      textDecoration: "underline",
                    },
                  }} onClick={handleAboutClick}>
                Home
              </Link>
              <Link href="#/products" sx={{
                    color: "#ffffff",
                    textDecoration: "none",
                    mr:4,
                    "&:hover": {
                      fontWeight:'bold',
                      textDecoration: "underline",
                    },
                  }} onClick={handleAboutClick}>
                Product
              </Link>
              <Link href="#/about" sx={{
                    color: "#ffffff",
                    textDecoration: "none",
                    mr:4,
                    "&:hover": {
                      fontWeight:'bold',
                      textDecoration: "underline",
                    },
                  }} onClick={handleAboutClick}>
                About
              </Link>
              <Link href="#/customize" sx={{
                    color: "#ffffff",
                    textDecoration: "none",
                    mr:4,
                    "&:hover": {
                      fontWeight:'bold',
                      textDecoration: "underline",
                    },
                  }} onClick={handleAboutClick}>
                Customize
              </Link>
              <Link href="#/user/dashboard" sx={{
                    color: "#ffffff",
                    textDecoration: "none",
                    mr:4,
                    "&:hover": {
                      fontWeight:'bold',
                      textDecoration: "underline",
                    },
                  }} onClick={handleAboutClick}>
                Profile
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <IconButton>
              <Link href={socialMediaLinks.facebook} color="#ffffff" sx={{mr:2}}>
                <FacebookIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={socialMediaLinks.twitter} color="#ffffff" sx={{mr:2}}>
                <TwitterIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={socialMediaLinks.instagram} color="#ffffff" sx={{mr:2}}>
                <InstagramIcon />
              </Link>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              © 2023 RosaEvo. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
