import React from "react";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import Blogcard from "../components/blogCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { blogList } from "../assets/config/data";
import Slider from "../components/slider"
import { Box, Typography, Link, Grid } from "@mui/material";
const Home = () => {
  return (
    <>
      <Nav />

      {/* BANNER */}
      <Box
        sx={{
          color: "#4D1F08",
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontFamily: "monospace", fontWeight: 600, textAlign: "center" }}
        >
          rosa.evo
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "monospace",
            fontWeight: 600,
            textAlign: "center",
            marginTop: 2,
          }}
        >
          Hand Crafted Jewellery With A Mothers Touch
        </Typography> 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px", // Adjust the gap between images
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          <img
            src="https://cdn.discordapp.com/attachments/1140959205986148372/1182703647377862756/WhatsApp_Image_2021-10-07_at_7.14.49_PM.jpg?ex=6585a99b&is=6573349b&hm=1d8498b21fa8c7f2bdf43b762a63681fdf461e458caf829d67627b92f295d739&"
            alt="Image 1"
            style={{ width: "30%" }} // Adjust the width and height as needed
          />
          <img
            src="https://media.discordapp.net/attachments/1140959205986148372/1182746305685094470/WhatsApp_Image_2021-10-07_at_7.14.51_PM_1.jpg?ex=6585d155&is=65735c55&hm=664245c8fae1ac2b41b23faf09c30ea516a1e519d525d002a915d7bbed77da52&=&format=webp&width=354&height=472"
            alt="Image 2"
            style={{ width: "30%" }} // Adjust the width and height as needed
          />
          <img
            src="https://media.discordapp.net/attachments/1140959205986148372/1182746610095095908/WhatsApp_Image_2021-10-17_at_5.33.25_PM.jpg?ex=6585d19e&is=65735c9e&hm=1fbf11a07a3fc24c0142bbd934d030d03ab4109ccc2b9ede655693c9077a63d1&=&format=webp&width=355&height=473"
            alt="Image 3"
            style={{ width: "30%" }} // Adjust the width and height as needed
          />
        </Box>
        <Link
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", color: "#4D1F08" }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 6,
            }}
          >
            Browse Products
            <ArrowRightAltIcon />
          </Typography>
        </Link>
  {/* About Us */}
        <Box
          sx={{
            backgroundColor: "#E0CDC2",
            marginTop: 5,
            padding: 3,
            textAlign: "center", // Center the content
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={4}>
              <img
                src="https://cdn.discordapp.com/attachments/1140959205986148372/1182748543681826856/iii.png?ex=6585d36b&is=65735e6b&hm=a8c43e2506c7570613a765f94c5988edfa42b1023c2bc4bd5346697141b6deed&"
                alt="logo"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "left", marginLeft: 4 }}>
                <Typography variant="h4">About us</Typography>
                <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
                  "Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit..."
                  <Link
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", color: "#4D1F08" }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 6,
            }}
          >
            Continue Reading
            <ArrowRightAltIcon />
          </Typography>
        </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
           {/* BLOGS */}
        <Box
          sx={{
            marginTop: 5,
            padding: 3,
            textAlign: "center", // Center the content
          }}
        >
          <Typography variant="h4" fontFamily="monospace" marginBottom={3}>
            Our Blogs
          </Typography>
          <Box style={{ marginLeft: 50 }}>
            <Grid container spacing={3}>
              {blogList.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Blogcard
                    id={post.id}
                    title={post.title}
                    desc={post.desc.slice(0, 50)}
                    category={post.category}
                    cover={post.cover}
                    date={post.date}
                    authorIcon={post.authoricon}
                    author={post.author}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Top Comments */}
          <Box
          sx={{
            marginTop: 5,
            padding: 3,
            backgroundColor: "#E0CDC2"
          }}
          >
            <Typography variant="h4" fontFamily="monospace" marginBottom={3}>
              Top Customer Reviews
            </Typography>
            <Slider/>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
