import React from "react";
import Blogcard from "../components/blogCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { blogList } from "../assets/config/blogdata";
import  { aboutdata } from "../assets/config/aboutdata";
import Slider from "../components/slider";
import { Box, Typography, Grid, Link } from "@mui/material";
import Navbar from "../components/navbar"
import Footer from "../components/footer"
const Home = () => {
  return (
    <>
    <Navbar/>
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
            style={{
              width: "30%",
              borderRadius: 30,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />

          <img
            src="https://media.discordapp.net/attachments/1140959205986148372/1182746305685094470/WhatsApp_Image_2021-10-07_at_7.14.51_PM_1.jpg?ex=6585d155&is=65735c55&hm=664245c8fae1ac2b41b23faf09c30ea516a1e519d525d002a915d7bbed77da52&=&format=webp&width=354&height=472"
            alt="Image 2"
            style={{
              width: "30%",
              borderRadius: 30,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
          <img
            src="https://media.discordapp.net/attachments/1140959205986148372/1182746610095095908/WhatsApp_Image_2021-10-17_at_5.33.25_PM.jpg?ex=6585d19e&is=65735c9e&hm=1fbf11a07a3fc24c0142bbd934d030d03ab4109ccc2b9ede655693c9077a63d1&=&format=webp&width=355&height=473"
            alt="Image 3"
            style={{
              width: "30%",
              borderRadius: 30,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>
        <Link
          href="#/products"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#4D1F08" }}
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
        </Box>
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
                <Typography
                  variant="h4"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {aboutdata.heading}
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="monospace"
                  sx={{ wordWrap: "break-word" }}
                >
                {aboutdata.content.slice(0,190)}...
                  <Link 
                    href="#/about"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#4D1F08" }}
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
          <Typography
            variant="h4"
            fontFamily="monospace"
            marginBottom={3}
            fontWeight="bold"
          >
            Our Blogs
          </Typography>
          <Box sx={{ margin: "0 auto", maxWidth: 1200 }}>
            <Grid container spacing={3} justifyContent="center">
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
        </Box>
        {/* Top Comments */}
        <Box
          sx={{
            marginTop: 5,
            padding: 3,
            backgroundColor: "#E0CDC2",
          }}
        >
          <Typography
            variant="h4"
            fontFamily="monospace"
            marginBottom={3}
            fontWeight="bold"
            textAlign="center"
          >
            Top Customer Reviews
          </Typography>
          <Slider />
        </Box>
        {/* FAQ */}
        <Box
          sx={{
            padding: 3,
             // Center the content
          }}
        >
<Grid container spacing={2}>
      <Grid item xs={5}>
        <Box p={4}>
          <Typography variant="subtitle2" gutterBottom style={{fontFamily:'monospace',fontWeight:'bold'}} >
            FAQ
          </Typography>
          <Typography variant="h5" gutterBottom style={{fontFamily:'monospace',fontWeight:'bold'}}  >
            Common Questions
          </Typography>
          <Typography variant="body1" gutterBottom style={{fontFamily:'monospace',}} >
            Here are some of the most common questions that we get.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={7}>
      <Typography variant="h6" gutterBottom style={{ marginTop: '16px', fontWeight:'bold', fontFamily:'monospace' ,color:'#4D1F08' }}>
          What is resin jewelry?
        </Typography>
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          Resin jewelry is made by pouring liquid resin into molds and allowing it to harden. It can be used to create
          various types of jewelry, such as earrings, necklaces, and bracelets.
        </Typography>

        <Typography variant="h6" gutterBottom style={{ marginTop: '16px', fontWeight:'bold', fontFamily:'monospace',color:'#4D1F08' }}>
          Is resin jewelry durable?
        </Typography>
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          Resin jewelry is generally durable, but it can be more prone to scratches and cracks compared to other
          materials. It is important to handle resin jewelry with care and avoid exposing it to harsh chemicals or
          extreme temperatures.
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: '16px', fontWeight:'bold', fontFamily:'monospace',color:'#4D1F08' }}>
          How do I clean resin jewelry?
        </Typography>
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          To clean resin jewelry, gently wipe it with a soft cloth or use mild soap and water. Avoid using harsh
          chemicals or abrasive materials that can damage the resin surface.
        </Typography>

        <Typography variant="h6" gutterBottom style={{ marginTop: '16px', fontWeight:'bold', fontFamily:'monospace',color:'#4D1F08' }}>
          Can I customize resin jewelry?
        </Typography>
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          Yes, many resin jewelry pieces can be customized. Some sellers offer options to choose colors, shapes, or even
          add personalized elements like initials or birthstones.
        </Typography>

        <Typography variant="h6" gutterBottom style={{ marginTop: '16px', fontWeight:'bold', fontFamily:'monospace',color:'#4D1F08' }}>
          How long does it take to receive my order?
        </Typography>
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          The delivery time depends on various factors, such as your location and the seller's processing time. It is
          best to check the estimated delivery time provided by the seller before placing your order.
        </Typography>
        </Grid>
    </Grid>
        </Box>
        <Footer/>
    </>
  );
};

export default Home;
