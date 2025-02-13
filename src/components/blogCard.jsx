import React from "react";
import { Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Blogcard(props) {
  const handleAboutClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="container grid3">
      <Card
        key={props.id}
        sx={{ maxWidth: 400, boxShadow: "0px 4px 8px rgba(0, 0, 0,)" }}
        className="box boxItems"
      >
          <CardMedia
            component="img"
            height="200"
            image={props.cover}
            alt={props.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontFamily: "monospace", color: "#4D1F08" }}
            >
              {props.title}
            </Typography>
            <Typography variant="body2">
              {props.desc.slice(0, 180)}...
            </Typography>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={props.authorIcon}
                  alt={props.author}
                  style={{
                    width: "10%",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <Typography variant="subtitle" style={{ color: "#754e37" }}>
                    {props.author}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="textSecondary">
                    {props.date}
                  </Typography>
                </div>
              </div>
              <span style={{ marginLeft: "5px" }}>
                <Link href={`#/blog/${props.id}`} style={{ color: "#754e37" }} onClick={handleAboutClick}>
                  <ArrowRightAltIcon />
                </Link>
              </span>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
