import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Grid container alignItems="center" justifyContent="center" spacing={isSmallerScreen ? 1 : 3}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <img
                src="https://media.discordapp.net/attachments/1140959205986148372/1183384642246680647/iii-removebg-preview.png?ex=65e46cd4&is=65d1f7d4&hm=b53ba1f3bdbdc330d7de85227c8bfc94e570de337c2d807074baab9548281dc5&=&format=webp&quality=lossless&width=322&height=473"
                alt="RosaEvo"
                style={{ maxWidth: "50%", height: "auto" }}
              />
              <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                RosaEvo
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>
              <Link
                href="/"
                sx={{
                  color: "#ffffff",
                  textDecoration: "none",
                  mr: isSmallerScreen ? 1 : 2,
                  "&:hover": {
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleAboutClick}
              >
                Home
              </Link>
              <Link
                href="#/products"
                sx={{
                  color: "#ffffff",
                  textDecoration: "none",
                  mr: isSmallerScreen ? 1 : 2,
                  "&:hover": {
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleAboutClick}
              >
                Product
              </Link>
              <Link
                href="#/about"
                sx={{
                  color: "#ffffff",
                  textDecoration: "none",
                  mr: isSmallerScreen ? 1 : 2,
                  "&:hover": {
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleAboutClick}
              >
                About
              </Link>
              <Link
                href="#/customize"
                sx={{
                  color: "#ffffff",
                  textDecoration: "none",
                  mr: isSmallerScreen ? 1 : 2,
                  "&:hover": {
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleAboutClick}
              >
                Customize
              </Link>
              <Link
                href="#/user/dashboard"
                sx={{
                  color: "#ffffff",
                  textDecoration: "none",
                  mr: isSmallerScreen ? 1 : 2,
                  "&:hover": {
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleAboutClick}
              >
                Profile
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <IconButton>
              <Link href={socialMediaLinks.facebook} color="#ffffff" sx={{ mr: 1 }}>
                <FacebookIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={socialMediaLinks.twitter} color="#ffffff" sx={{ mr: 1 }}>
                <TwitterIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={socialMediaLinks.instagram} color="#ffffff" sx={{ mr: 1 }}>
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
