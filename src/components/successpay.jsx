import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

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
        disabled={props.disabled}
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
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <DialogContentText id="alert-dialog-description" >
            <Typography align='center'>
              Your payment has been successfully processed. Thank you for your
              purchase!
            </Typography>
          </DialogContentText>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/order-confirmed-5115435-4273317.png"
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
