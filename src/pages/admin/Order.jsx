import * as React from 'react';
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
import supabase from "../../assets/config/SupabaseClient";
import Link from '@mui/material/Link';
import { Button } from '@mui/material';


export default function Orders() {
  const [orderData, setOrderData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  React.useEffect(() => {
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
  React.useEffect(() => {
    markAsDelivered();
    supabase
      .channel("room1")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
        markAsDelivered();
      })
      .subscribe();

    return () => {
      supabase.removeChannel("room1");
    };
  }, []);


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
                  <TableCell>{`${row.user_details[0].state}, ${row.user_details[0].city}`}</TableCell>
                  <TableCell>{row.ordered_prods.map(product => product.prod_name).join(", ")}</TableCell>
                  <TableCell>{`$${row.total_price}`}</TableCell>
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
