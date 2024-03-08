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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

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
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={isSmallerScreen ? 1 : 3}
        >
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <img
                src="https://i.ibb.co/7Kq2xhY/iii-removebg-preview.png"
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
              <WhatsAppIcon sx={{ mr: 1, color: "#ffffff" }} />{" "}
              <Typography sx={{ color: "#ffffff" }}>
                Contact us on +91 1234567890
              </Typography>
            </IconButton>
            <IconButton>
              <Link
                href="https://www.instagram.com/rosa.evo"
                color="#ffffff"
                sx={{ mr: 1 }}
                target="_blank"
                rel="noopener noreferrer"
              >
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
