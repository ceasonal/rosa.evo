import React from "react";
import Blogcard from "../components/blogCard";
import Slider from "../components/slider";
import Footer from "../components/footer";
import { blogList } from "../assets/config/blogdata";
import { aboutdata } from "../assets/config/aboutdata";
import { Box, Typography, Grid, Link } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
const Home = () => {

  const [animationComplete, setAnimationComplete] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;

    // Initial state of the logo (hidden)
    gsap.set(logo, { autoAlpha: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Animation complete callback
        setAnimationComplete(true);
      }
    });

    tl.to(logo, { duration: 0.1, autoAlpha: 1, repeat: 5, yoyo: true }) // Flicker
    .to(logo, { duration: 3, autoAlpha: 1 }) // Fade in
    .to(logo, { duration: 0.1, autoAlpha: 0, repeat: 5, yoyo: true }) // Flicker
    .to(logo, { duration: 2, autoAlpha: 0 }); // Fade out

    // Cleanup
    return () => {
      tl.kill(); // Kill the animation on unmount
    };
  }, []);

  return (
    <>
    { /* Logo Animation */ }
    <div ref={logoRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
    <img src="https://i.ibb.co/7Kq2xhY/iii-removebg-preview.png" width="50%" height="50%" viewBox="0 0 24 24"/>
    <Typography
    sx={{
      fontFamily: "monospace",
      fontWeight: 600,
      textAlign: "center",
      color: "#4D1F08",
      fontSize: 24,
      marginTop: 2
    }}
    >Rosa Evo</Typography>
</div>

      { animationComplete && (
        <>
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
          Hand Crafted Jewellery With A Mother's Touch
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
            src="https://i.ibb.co/s6sGSxv/Whats-App-Image-2021-10-17-at-6-52-40-PM.jpg"
            alt="Image 1"
            style={{
              width: "30%",
              borderRadius: 30,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />

          <img
            src="https://i.ibb.co/vVFfhM7/Whats-App-Image-2021-10-17-at-3-25-23-PM-1.jpg"
            alt="Image 2"
            style={{
              width: "30%",
              borderRadius: 30,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
          <img
            src="https://i.ibb.co/XZ0SM05/Whats-App-Image-2021-10-17-at-5-33-25-PM.jpg"
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
      {/* Our Story */}
      <Box
        sx={{
          // backgroundColor: "#E0CDC2",
          backgroundColor: "rgba(224, 205, 194, 0.3)",
          marginTop: 5,
          padding: 3,
          textAlign: "center", // Center the content
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={4}>
            <img
              src="https://i.ibb.co/7Kq2xhY/iii-removebg-preview.png"
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
                style={{ textDecoration: "underline" }}
                marginBottom={1}
                color="#4D1F08"
              >
                {aboutdata.heading}
              </Typography>
              <Typography
                variant="h6"
                fontFamily="sans"
                sx={{ wordWrap: "break-word" }}
                color="#4D1F08"
              >
                {aboutdata.content.slice(0, 190)}...
              </Typography>
              <Link
                href="#/about"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#4D1F08" }}
                onClick={() => window.scrollTo(0, 0)}
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
          style={{ textDecoration: "underline" }}
          color="#4D1F08"
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
          // backgroundColor: "#E0CDC2",
          backgroundColor: "rgba(224, 205, 194, 0.3)",
        }}
      >
        <Typography
          variant="h4"
          fontFamily="monospace"
          marginBottom={3}
          fontWeight="bold"
          textAlign="center"
          style={{ textDecoration: "underline" }}
          color="#4D1F08"
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
          <Grid item xs={6}>
            <Box p={4}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "#4D1F08",
                }}
              >
                FAQ
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#4D1F08",
                }}
              >
                Common Questions
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontFamily: "monospace", color: "#4D1F08" }}
              >
                Here are some of the most common questions that we get.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#4D1F08",
              }}
            >
              What is resin jewelry?
            </Typography>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              Resin jewelry is made by pouring liquid resin into molds and
              allowing it to harden. It can be used to create various types of
              jewelry, such as earrings, necklaces, and bracelets.
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#4D1F08",
              }}
            >
              Is resin jewelry durable?
            </Typography>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              Resin jewelry is generally durable, but it can be more prone to
              scratches and cracks compared to other materials. It is important
              to handle resin jewelry with care and avoid exposing it to harsh
              chemicals or extreme temperatures.
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#4D1F08",
              }}
            >
              How do I clean resin jewelry?
            </Typography>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              To clean resin jewelry, gently wipe it with a soft cloth or use
              mild soap and water. Avoid using harsh chemicals or abrasive
              materials that can damage the resin surface.
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#4D1F08",
              }}
            >
              Can I customize resin jewelry?
            </Typography>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              Yes, many resin jewelry pieces can be customized. Some sellers
              offer options to choose colors, shapes, or even add personalized
              elements like initials or birthstones.
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#4D1F08",
              }}
            >
              How long does it take to receive my order?
            </Typography>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              The delivery time depends on various factors, such as your
              location and the seller's processing time. It is best to check the
              estimated delivery time provided by the seller before placing your
              order.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Footer />
      </>
      )}
    </>
  );
};

export default Home;
