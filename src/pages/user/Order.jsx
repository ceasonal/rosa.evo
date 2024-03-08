import * as React from 'react';
import { useState, useEffect } from 'react';
import supabase from "../../assets/config/SupabaseClient";
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

export default function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderData = async () => {
    try {
      const { data: { user }} = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("order")
        .select("*")
        .eq("user_uuid", user.id)
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
          No orders found. <Link href="#/products">Go shop</Link>.
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
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.order_uuid}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.user_details[0].first_name}</TableCell>
                  <TableCell>{row.user_details[0].state}, {row.user_details[0].city}</TableCell>
                  <TableCell>{row.ordered_prods.map(product => product.prod_name).join(", ")}</TableCell>
                  <TableCell>{`₹ ${row.total_price}`}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === "Delivered" ? "success" : "warning"}
                    />
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
