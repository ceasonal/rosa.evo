import * as React from "react";
import { useEffect, useState } from "react";
import supabase from "../../assets/config/SupabaseClient";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const markAsContacted = async (customID) => {
    try {
      const { error } = await supabase
        .from("custom")
        .update({ status: "in contact" })
        .eq("custom_id", customID);
      if (error) {
        throw error;
      }
      console.log("Contacted user");
      fetchOrderData();
    } catch (error) {
      console.error("Error marking contacting user:", error.message);
    }
  };

  const markAsOrdered = async (customID) => {
    try {
      const { error } = await supabase
        .from("custom")
        .update({ orderplaced: "placed" }) 
        .eq("custom_id", customID);
      if (error) {
        throw error;
      }
      console.log("Order marked as placed");
      fetchOrderData();
    } catch (error) {
      console.error("Error marking order as placed:", error.message);
    }
  };

  const markAsDelivered = async (customID) => {
    try {
      const { error } = await supabase
        .from("custom")
        .update({ delivered: "delivered" })
        .eq("custom_id", customID);
      if (error) {
        throw error;
      }
      console.log("Order marked as delivered");
      fetchOrderData();
    } catch (error) {
      console.error("Error marking order as delivered:", error.message);
    }
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

  useEffect(() => {
    fetchOrderData();
  }, []);

  const handleClickProductDialogOpen = (row) => {
    setSelectedRow(row);
    setProductDialogOpen(true);
  };


  const handleCloseDialogs = () => {
    setProductDialogOpen(false);
    setImageDialogOpen(false);
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
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Ordered</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Delivered</TableCell>
                <TableCell align="center">Action</TableCell>
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
                    <Chip
                      label={row.status}
                      color={
                        row.status === "in contact" ? "success" : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={row.status === "in contact"}
                      onClick={() =>
                        markAsContacted(row.custom_id)
                      }
                      sx={{
                        borderRadius: 16,
                        textTransform: "none",
                        minWidth: "auto",
                        height: 32,
                        py: 0,
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>

                  {/* order placed */}
                  <TableCell>
                    <Chip
                      label={row.orderplaced}
                      color={
                        row.orderplaced === "placed" ? "success" : "warning" 
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                     color="primary"
                      variant="contained"
                      disabled={row.orderplaced === "placed"} 
                      onClick={() =>
                        markAsOrdered(row.custom_id) 
                      }
                      sx={{
                        borderRadius: 16,
                        textTransform: "none",
                        minWidth: "auto",
                        height: 32,
                        py: 0,
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>

                  {/* order delivered */}
                  <TableCell>
                    <Chip
                      label={row.delivered}
                      color={
                        row.delivered === "preparing" ? "warning" : "success"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={row.delivered === "delivered"}
                      onClick={() =>
                        markAsDelivered(row.custom_id)
                      }
                      sx={{
                        borderRadius: 16,
                        textTransform: "none",
                        minWidth: "auto",
                        height: 32,
                        py: 0,
                      }}
                    >
                      Update
                    </Button>
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
            <br/>
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
