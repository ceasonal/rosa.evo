import React, { useRef, useState } from "react";
import { Container, IconButton, Typography, Avatar, Box } from "@mui/material";
import Rating from '@mui/material/Rating';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const topComments = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://source.unsplash.com/50x50/?person",
      social: {
        instagram: "https://instagram.com/johndoe",
      },
    },
    comment: "This is an amazing website! I love the content and design.",
    value: 5
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "https://source.unsplash.com/50x50/?woman",
      social: {
        instagram: "https://instagram.com/janesmith",
      },
    },
    comment: "The information provided here is very useful. Keep it up!",
    value: 4.5
  },
  {
    id: 4,
    user: {
      name: "Alia Doe",
      avatar: "https://source.unsplash.com/50x50/?person",
      social: {
        instagram: "https://instagram.com/janesmith",
      },
    },
    comment: "Very Epic Products! Must buy.",
    value: 4
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
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, topComments.length - 1));
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
            justifyContent: "center",  // Centering the content
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
            <Avatar src={topComments[activeIndex].user.avatar} alt={topComments[activeIndex].user.name} sx={{ marginBottom: 1 }} />
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
              <Rating name="read-only" value={topComments[activeIndex].value} readOnly precision={0.5} />
            </Box>
            <Typography variant="body2">{topComments[activeIndex].comment}</Typography>
          </Box>
        </Box>
        <IconButton onClick={handleNextClick} disabled={activeIndex === topComments.length - 1}>
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
