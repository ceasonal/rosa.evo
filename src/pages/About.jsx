import AboutUsCard from "../components/choosecard";
import { aboutdata, missiondata } from "../assets/config/aboutdata";
import img1 from "../assets/images/test.jpg";
import img2 from "../assets/images/test1.jpg";
import Footer from "../components/footer";
import { Box, Grid, Typography } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
const About = () => {
  return (
    <>
      <Box
        sx={{
          color: "#4D1F08",
          padding: 3,
        }}
      >
        <Box
          sx={{
            // backgroundColor: "#E0CDC2",
            backgroundColor: "rgba(224, 205, 194, 0.2)",
            padding: 3,
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="h3"
            fontFamily="monospace"
            marginTop={3}
          >
            About Us
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            variant="h6"
            fontFamily="monospace"
            marginBottom={3}
          >
            Crafting Memories, One Jewel at a Time – Where Artistry Meets
            Heartfelt Passion.
          </Typography>
        </Box>

        <Grid container spacing={3} padding={4} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" fontWeight="bold" fontFamily="monospace">
              {aboutdata.heading}
            </Typography>
            <Typography variant="body1">{aboutdata.content}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: 4,
              }}
            >
              <img
                src={img1}
                alt="team"
                style={{
                  maxWidth: "40%", // Adjust the percentage as needed
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            backgroundColor: "rgba(224, 205, 194, 0.3)",
            padding: 4,
            mt: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: 4,
                }}
              >
                <img
                  src={img2}
                  alt="team"
                  style={{
                    maxWidth: "40%", // Adjust the percentage as needed
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" fontWeight="bold" fontFamily="monospace">
                {missiondata.heading}
              </Typography>
              <Typography variant="body1">{missiondata.content}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography
          align="center"
          color="textSecondary"
          variant="h5"
          sx={{ mt: 3 }}
          fontFamily="monospace"
          fontWeight="bold"
        >
          Why Choose Us
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "4fr 4fr" },
            gap: 3,
            mt: 2,
            marginTop: 3,
            marginBottom: 3,
            justifyItems: "center",
          }}
        >
          <AboutUsCard
            icon={<ShoppingCart />}
            header="Wide Range Of Designs"
            para="Choose from a diverse collection of unique and stylish resin jewelry designs"
          />
          <AboutUsCard
            icon={<GavelIcon />}
            header="High Quality Materials"
            para="Crafted with premium quality resin and durability materials for long-lasting beauty"
          />
          <AboutUsCard
            icon={<AutoFixHighIcon />}
            header="Create Your Unique Piece"
            para="Express yourself by customizing our jewelry or request to make a different product"
          />
          <AboutUsCard
            icon={<AccountBalanceIcon />}
            header="Secure Online Shopping"
            para="Shop with confidence knowing that your personal and payment information is protected with advanced security measures"
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default About;
