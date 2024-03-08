import React from "react";
import { CardActionArea, Icon } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function AboutUsCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="center"
            fontFamily="monospace"
            color="#4D1F08"
          >
            {props.icon && (
              <Icon sx={{ marginRight: "20px", color: "#be9269" }}>
                {props.icon}
              </Icon>
            )}
            {props.header}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.para}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
