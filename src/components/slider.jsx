import React, { useRef, useState } from "react";
import { Container, IconButton, Typography, Avatar, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const topComments = [
  {
    id: 1,
    user: {
      name: "Ninad K",
      avatar: "https://i.ibb.co/6ySX45J/ninad.jpg",
      social: {
        instagram: "https://instagram.com/ninadkarkhanis",
      },
    },
    comment: "Great quality products! My mom loved it.",
    value: 5,
  },
  {
    id: 2,
    user: {
      name: "Hamza",
      avatar: "https://i.ibb.co/vQfdw4N/hamza.jpg",
      social: {
        instagram: "https://instagram.com/hamza_kapasi",
      },
    },
    comment: "Highly recommend this resin ring from rosa evo! Stunning design, excellent quality, and top-notch customer service. Love it!",
    value: 5,
  },
  {
    id: 4,
    user: {
      name: "Viraj Panickar",
      avatar: "https://i.ibb.co/8BQZr1V/viraj.jpg",
      social: {
        instagram: "https://instagram.com/virah_b1331",
      },
    },
    comment: "AMAZING QUALITY AND THE PACKAGING IS SUPERB!!",
    value: 5,
  },
];

const CommentSlider = () => {
  const sliderRef = useRef(null);
  const commentWidth = 400;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, topComments.length - 1)
    );
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: 2,
        }}
      >
        <IconButton onClick={handlePrevClick} disabled={activeIndex === 0}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Box
          ref={sliderRef}
          sx={{
            display: "flex",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center", // Centering the content
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "300px",
              padding: 2,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "white",
              marginBottom: 1,
            }}
          >
            <Avatar
              src={topComments[activeIndex].user.avatar}
              alt={topComments[activeIndex].user.name}
              sx={{ marginBottom: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {topComments[activeIndex].user.name}
              </Typography>
              <IconButton
                component="a"
                href={topComments[activeIndex].user.social.instagram}
                target="_blank"
                sx={{ marginLeft: 1 }}
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Rating
                name="read-only"
                value={topComments[activeIndex].value}
                readOnly
                precision={0.5}
              />
            </Box>
            <Typography variant="body2">
              {topComments[activeIndex].comment}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleNextClick}
          disabled={activeIndex === topComments.length - 1}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {topComments.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleDotClick(index)}
            color={index === activeIndex ? "primary" : "default"}
          >
            •
          </IconButton>
        ))}
      </Box>
    </Container>
  );
};

export default CommentSlider;
