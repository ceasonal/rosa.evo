import * as React from "react";
import { useEffect, useState } from "react";
import supabase from "../../assets/config/SupabaseClient";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { FormControl } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.light,
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
  },
  select: {
    width: 160, 
  }
}));

export default function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const classes = useStyles();

  const fetchOrderData = async () => {
    try {
      const { data, error } = await supabase
        .from("custom")
        .select("*")
        .order("created_at", { ascending: false });

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

  const updateStatus = async (customID, statusType, statusValue) => {
    try {
      const { error } = await supabase
        .from("custom")
        .update({ [statusType]: statusValue })
        .eq("custom_id", customID);
      if (error) {
        throw error;
      }
      console.log("Status updated successfully");
      fetchOrderData();
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const handleClickProductDialogOpen = (row) => {
    setSelectedRow(row);
    setProductDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setProductDialogOpen(false);
  };

  const handleStatusChange = (event, customID, statusType) => {
    updateStatus(customID, statusType, event.target.value);
  };

  const deleteRequest = async (customID) => {
    try {
      const { error } = await supabase
        .from("custom")
        .delete()
        .eq("custom_id", customID);
      if (error) {
        throw error;
      }
      console.log("Request deleted successfully");
      fetchOrderData();
    } catch (error) {
      console.error("Error deleting request:", error.message);
    }
  };

  const handleAmountChange = (event, customID) => {
    const { value } = event.target;
    const newValue = value < 0 ? 0 : value;
    setOrderData((prevData) =>
      prevData.map((row) =>
        row.custom_id === customID ? { ...row, amount: newValue } : row
      )
    );
  };

  const saveAmount = async (customID) => {
    try {
      const { error } = await supabase
        .from("custom")
        .update({
          amount: orderData.find((row) => row.custom_id === customID).amount,
        })
        .eq("custom_id", customID);
      if (error) {
        throw error;
      }
      console.log("Amount updated successfully");
      fetchOrderData();
    } catch (error) {
      console.error("Error updating amount:", error.message);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Custom Requests
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
                <TableCell>Request ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Ordered</TableCell>
                <TableCell align="center">Delivered</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Delete Request</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.custom_id}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleClickProductDialogOpen(row)}
                    >
                      View Info
                    </Button>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined" className={classes.select}>
                      <Select
                        value={row.status}
                        onChange={(event) =>
                          handleStatusChange(event, row.custom_id, "status")
                        }
                        className={
                          row.status === "in contact"
                            ? classes.success
                            : classes.warning
                        }
                      >
                        <MenuItem value="in contact">In Contact</MenuItem>
                        <MenuItem value="yet to contact">
                          Not Contacted
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined" className={classes.select}>
                      <Select
                        value={row.orderplaced}
                        onChange={(event) =>
                          handleStatusChange(
                            event,
                            row.custom_id,
                            "orderplaced"
                          )
                        }
                        className={
                          row.orderplaced === "placed"
                            ? classes.success
                            : classes.warning
                        }
                      >
                        <MenuItem value="placed">Placed</MenuItem>
                        <MenuItem value="not placed">Not Placed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined" className={classes.select}>
                      <Select
                        value={row.delivered}
                        onChange={(event) =>
                          handleStatusChange(event, row.custom_id, "delivered")
                        }
                        className={
                          row.delivered === "delivered"
                            ? classes.success
                            : classes.warning
                        }
                      >
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="preparing">Preparing</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.amount}
                      onChange={(event) =>
                        handleAmountChange(event, row.custom_id)
                      }
                      onBlur={() => saveAmount(row.custom_id)}
                      variant="outlined"
                      size="small"
                      type="number"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteRequest(row.custom_id)}
                      sx={{
                        borderRadius: 16,
                        textTransform: "none",
                        minWidth: "auto",
                        height: 32,
                        py: 0,
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Product Dialog */}
      <Dialog
        open={productDialogOpen}
        onClose={handleCloseDialogs}
        fullScreen={fullScreen}
      >
        <DialogTitle>About Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Date: {selectedRow && selectedRow.created_at}
            <br />
            User Name: {selectedRow && selectedRow.user_name}
            <br />
            Contact Details: {selectedRow && selectedRow.user_contact}
            <br />
            Description: {selectedRow && selectedRow.prod_description}
            <br />
            {selectedRow && selectedRow.prod_image ? (
              <>
                <p>Image: </p>
                <img
                  src={selectedRow.prod_image}
                  alt="Product"
                  style={{ width: "50%" }}
                />
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
