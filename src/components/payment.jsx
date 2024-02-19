import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CreditCardForm from "./paymentCard";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} sx={{
                mt: 2,
                backgroundColor: "#957461",
                "&:hover": {
                  backgroundColor: "#685043",
                },
              }}>
       CheckOut
       <ArrowRightAltIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(3px)",
          fontFamily:'monospace'
        }}
      >
        <DialogContent
        sx={{
          backgroundColor:'rgba(224, 205, 194, 0.3)'
        }}
        >
            <>
            <div className="container mt-5">
      <h2 className="mb-4" align="center" style={{color:'#4D1F08'}}>Enter credit card details</h2>
      <CreditCardForm />
    </div>
            </>
        </DialogContent>
        <DialogActions sx={{backgroundColor:'rgba(224, 205, 194, 0.3)'}}>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
