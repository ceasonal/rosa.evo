import * as React from 'react';
import { useEffect, useState } from 'react';
import supabase from "../../assets/config/SupabaseClient";
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchOrderData = async () => {
    try {
      const { data, error } = await supabase
        .from("order")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      if (data) {
        setOrderData(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const markAsDelivered = async (orderID) => {
    try {
      const { error } = await supabase
        .from("order")
        .update({ status: "Delivered" })
        .eq("order_uuid", orderID);
      if (error) {
        throw error;
      }
      console.log("Order marked as delivered");
      fetchOrderData();
    } catch (error) {
      console.error("Error marking order as delivered:", error.message);
    }
  }

  useEffect(() => {
    markAsDelivered();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Order history
      </Typography>
      <Divider />
      {isLoading ? ( 
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      ) : orderData.length === 0 ? ( 
        <Typography variant="body1" sx={{ mt: 2 }}>
          No one has ordered yet ;-;
        </Typography>
      ) : ( 
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Sale Amount</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.order_uuid}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.user_details[0].first_name}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={handleClickOpen}>
                      View
                    </Button>
                    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
                      <DialogTitle>Address</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          State: {row.user_details[0].state}, City/Town: {row.user_details[0].city} <br />
                          Zip: {row.user_details[0].zip_code}, Address: {row.user_details[0].address} <br />
                          First Name: {row.user_details[0].first_name}, Last Name: {row.user_details[0].last_name} <br />
                          Phone Number: {row.user_details[0].phone}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                  <TableCell>{row.ordered_prods.map(product => product.prod_name).join(", ")}</TableCell>
                  <TableCell>{`₹ ${row.total_price}`}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === "Delivered" ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={row.status === "Delivered"}
                      onClick={() => markAsDelivered(row.order_uuid, "Delivered")}
                      sx={{ borderRadius: 16, textTransform: 'none', minWidth: 'auto', height: 32, py: 0 }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
