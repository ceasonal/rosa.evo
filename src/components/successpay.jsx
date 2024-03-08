import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
    height: "auto",
  },
}));

const PurchaseButton = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          backgroundColor: "#957461",
          "&:hover": {
            backgroundColor: "#685043",
          },
        }}
        fullWidth
        disabled={props.disabled} // Disable button if form is not completed
        onClick={() => {
          handleClickOpen();
          props.onClick();
        }}
      >
        Purchase
        <CreditScoreIcon sx={{ ml: 2 }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Payment Successful"}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Thank you for your purchase!
          </DialogContentText>
          <img
            src="https://cdn.discordapp.com/attachments/1140959205986148372/1209909946339041411/Capture-removebg-preview_1.png?ex=65e8a372&is=65d62e72&hm=c161262280743463e47acf68dc727458f7ebb4f2d4888e80e9283b0131e9d109"
            alt="Confirmation"
            className={classes.image}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PurchaseButton;
