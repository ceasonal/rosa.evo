import { useState, useEffect } from "react";
import supabase from "../../assets/config/SupabaseClient";
import { Typography, Grid, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PendingIcon from "@mui/icons-material/Pending";
import WindowIcon from "@mui/icons-material/Window";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

const Stats = () => {
  const [totProd, setTotProd] = useState(0);
  const [totUser, setTotUser] = useState(0);
  const [totIncome, setTotIncome] = useState(0);
  const [totOrder, setTotOrder] = useState(0);
  const [pendDel, setPendDel] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [customDelivered, setCustomDelivered] = useState(0);
  const [customPending, setCustomPending] = useState(0);
  const [customTotal, setCustomTotal] = useState(0);
  const [customSum, setCustomSum] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prodsData } = await supabase
          .from("DisplayProducts")
          .select("disp_uuid");
        setTotProd(prodsData.length);

        const { data: user } = await supabase.from("auth").select("email");
        setTotUser(user.length);

        const { data: orders } = await supabase
          .from("order")
          .select("order_uuid");
        setTotOrder(orders.length);

        const { data: pending } = await supabase
          .from("order")
          .select("order_uuid")
          .eq("status", "being prepared");
        setPendDel(pending.length);

        const { data: delivered } = await supabase
          .from("order")
          .select("order_uuid")
          .eq("status", "Delivered");
        setDelivered(delivered.length);

        const { data: customTotals } = await supabase
        .from("custom")
        .select("custom_id")
        setCustomTotal(customTotals.length);

        const { data: customDelivereds } = await supabase
        .from("custom")
        .select("custom_id")
        .eq("delivered", "delivered");
        setCustomDelivered(customDelivereds.length);

        const { data: customPendings } = await supabase
        .from("custom")
        .select("custom_id")
        .eq("delivered", "preparing");
        setCustomPending(customPendings.length);

        const { data: customIncomes, error } = await supabase
        .from("custom")
        .select("amount");
      if (error) throw error;

      const customSum = customIncomes.reduce((total, item) => total + item.amount, 0);
      setCustomSum(customSum);

      const { data: income } = await supabase
        .from("order")
        .select("total_price");

      const totIncome = income.reduce((total, item) => total + item.total_price, 0) + customSum;
      setTotIncome(totIncome);

      console.log(totIncome);
        setTotIncome(sum+customSum);
        console.log(totIncome)
        
      } catch (error) {
        null;
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Status
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <PeopleAltIcon style={{ color: "#be9269", marginBottom: "10px" }} />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {totUser}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              User Count
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <WindowIcon style={{ color: "#be9269", marginBottom: "10px" }} />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {totProd}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Total Products
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <SavingsIcon style={{ color: "#be9269", marginBottom: "10px" }} />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {totIncome}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Total Income
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <ShoppingBasketIcon
              style={{ color: "#be9269", marginBottom: "10px" }}
            />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {totOrder}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Total Orders
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <PendingIcon style={{ color: "#be9269", marginBottom: "10px" }} />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {pendDel}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Pending Orders
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <LibraryAddCheckIcon
              style={{ color: "#be9269", marginBottom: "10px" }}
            />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {delivered}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Delivered
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <ShoppingBasketIcon
              style={{ color: "#be9269", marginBottom: "10px" }}
            />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {customTotal}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Total Custom Orders
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <PendingIcon style={{ color: "#be9269", marginBottom: "10px" }} />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {customPending}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Pending Orders
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#1E1E1E",
              boxShadow: "0px 0px 10px 0px #000000",
              width: "100%",
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <LibraryAddCheckIcon
              style={{ color: "#be9269", marginBottom: "10px" }}
            />
            <Typography
              variant="body1"
              color="white"
              style={{
                marginBottom: "15px",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {customDelivered}
            </Typography>
            <Typography variant="body1" color="white" fontFamily="monospace">
              Delivered
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Stats;
