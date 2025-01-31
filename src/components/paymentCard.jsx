import React, { useState, useEffect } from "react";
import supabase from "../assets/config/SupabaseClient";
import { useNavigate } from "react-router-dom";
import SuccessPay from "./successpay";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import { TextField, Grid } from "@mui/material";
import emailjs from "@emailjs/browser";

const CreditCardForm = () => {
  let newUUID = null;
  const navigate = useNavigate();
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
  const [totalProdPrice, setTotalProdPrice] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    switch (name) {
      case "number":
        validatedValue = value.replace(/\D/g, "").slice(0, 16);
        break;
      case "name":
        validatedValue = value.replace(/[^a-zA-Z]/g, "").slice(0, 21);
        break;
      case "expiry":
        validatedValue = value.replace(/\D/g, "").slice(0, 4);
        break;
      case "cvc":
        validatedValue = value.replace(/\D/g, "").slice(0, 3);
        break;
      default:
        break;
    }

    setState((prev) => ({ ...prev, [name]: validatedValue }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const [cartData, setCartData] = useState([]);
  const [userData, setUserData] = useState([]);

  const fetchCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        throw error;
      }
      if (data) {
        setCartData(data);
        let totalPrice = 0;
        data.forEach((item) => {
          totalPrice += item.prod_price;
        });
        // Add shipping and tax
        const shipping = 200;
        const tax = 30;
        totalPrice += shipping + tax;

        // Set the total product price
        setTotalProdPrice(totalPrice);
      }
    } catch (error) {
      console.log("error fetching cart items", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_uuid", user.id);
      if (error) {
        throw error;
      }
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log("error fetching user data", error);
    }
  };

  const deleteCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Cart items deleted successfully");
    } catch (error) {
      console.error("Error deleting cart items:", error);
    }
  };

  const createOrder = async () => {
    // let newUUID = null;
    const generateUUID = () => {
      newUUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = (Math.random() * 16) | 0;
          let v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      console.log(newUUID);
    };
    generateUUID();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("order").insert([
        {
          user_uuid: user.id,
          ordered_prods: cartData,
          user_details: userData,
          total_price: totalProdPrice,
          order_uuid: newUUID,
        },
      ]);
      if (error) {
        throw error;
      }
      console.log("Order created successfully:", data);
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  // EMAILJS
  const sendEmail = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Check if user exists
        // Format order details
        const formattedCartData = cartData.map((item) => ({
          prod_name: item.prod_name,
          prod_price: item.prod_price,
        }));

        // Format user details
        const formattedUserData = userData.map((item) => ({
          first_name: item.first_name,
          last_name: item.last_name,
          phone: item.phone,
          state: item.state,
          city: item.city,
          zip_code: item.zip_code,
          address: item.address,
          type: item.type,
        }));

        // Send email
        await emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          {
            user_email: user.email,
            message: `Order ID: ${newUUID}\nOrder details:\n${formattedCartData
              .map((item) => `${item.prod_name}: ${item.prod_price} ₹`)
              .join("\n")}\n\nUser details:\n${formattedUserData
              .map(
                (item) =>
                  `${item.first_name} ${item.last_name}\nPhone: ${item.phone}\nAddress: ${item.address}, ${item.city}, ${item.state} ${item.zip_code}\nType: ${item.type}`
              )
              .join(
                "\n"
              )}\n\nTotal price ( Shipping & Tax Included ): ${totalProdPrice} ₹`,
          },
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        );
        console.log("Your order has been placed!");
        console.log(user.email);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const paymentConfirm = async () => {
    try {
      await fetchCartItems();
      await fetchUserData();
      await createOrder();
      await deleteCartItems();
      await sendEmail();
      navigate("/");
      window.location.reload();
      setCartData([]);
      setUserData([]);
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check if all fields are filled
    const isFormCompleted =
      state.number !== "" &&
      state.name !== "" &&
      state.expiry !== "" &&
      state.cvc !== "";
    setFormCompleted(isFormCompleted);
  }, [state]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                name="number"
                label="Card Number"
                variant="outlined"
                fullWidth
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                inputProps={{ maxLength: 16 }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                inputProps={{ maxLength: 21 }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                name="expiry"
                label="Valid Thru"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 4 }}
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                name="cvc"
                label="CVC"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 3 }}
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </Grid>
          </Grid>
          <SuccessPay disabled={!formCompleted} onClick={paymentConfirm} />
        </form>
      </Grid>
    </Grid>
  );
};

export default CreditCardForm;
