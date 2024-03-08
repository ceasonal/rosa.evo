import React from "react";
import Error from "../assets/images/error.png";
import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={Error}
        alt="404"
        style={{
          width: "40%",
          marginBottom: "20px",
        }}
      />
      <Typography
        gutterBottom
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          marginTop: "20px",
          color: "#4D1F08",
          fontFamily: "monospace",
        }}
      >
        The page you are looking for does not exist
      </Typography>
    </Container>
  );
};

export default NotFound;
