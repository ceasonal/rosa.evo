import React, { useState, useEffect } from "react";
import supabase from "../../assets/config/SupabaseClient";
import { State } from "country-state-city";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AddressForm() {
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleStateChange = (event) => {
    const stateName = event.target.value;
    const code = State.getStatesOfCountry("IN").find(
      (state) => state.name === stateName
    ).isoCode;
    setSelectedState(stateName);
    setZipCode("");
    setCity("");
  };

  const handleCityChange = (event) => {
    setZipCode("");
  };

  useEffect(() => {
    const isFormComplete =
      selectedState !== "" &&
      city !== "" &&
      zipCode.length === 6 &&
      fname !== "" &&
      lname !== "" &&
      address !== "" &&
      type !== "" &&
      phoneNumber.length === 10;
    if (isFormComplete) {
      setSnackbarSeverity("success"); 
    } else {
      setSnackbarSeverity("error"); 
    }
  }, [selectedState, city, zipCode, fname, lname, address, phoneNumber, type]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("user_uuid", user.id)
          .single();
        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setFname(data.first_name);
          setLname(data.last_name);
          setAddress(data.address);
          setPhoneNumber(data.phone);
          setSelectedState(data.state);
          setCity(data.city);
          setZipCode(data.zip_code);
          setType(data.type);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => {
        setSnackbarMessage(error);
        setSnackbarOpen(true);
      });
    } else {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase.from("user").upsert([
          {
            first_name: fname,
            last_name: lname,
            address: address,
            phone: phoneNumber,
            state: selectedState,
            city: city,
            zip_code: zipCode,
            user_uuid: user.id,
            type: type,
          },
        ]);
        if (error) {
          throw error;
        }
        setSnackbarMessage("Address submitted successfully!");
        setSnackbarOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!selectedState) {
      errors.push("State is required.");
    }
    if (!city) {
      errors.push("City is required.");
    }
    if (zipCode.length !== 6) {
      errors.push("Zip code must be 6 digits long.");
    }
    if (!fname) {
      errors.push("First name is required.");
    }
    if (!lname) {
      errors.push("Last name is required.");
    }
    if (!address) {
      errors.push("Address is required.");
    }
    if (!type) {
      errors.push("Type is required.");
    }
    if (phoneNumber.length !== 10) {
      errors.push("Phone number must be 10 digits long.");
    }
    return errors;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="type"
            name="type"
            label="type"
            fullWidth
            autoComplete="typeofname"
            variant="standard"
            placeholder="home/work/other"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="tel"
            variant="standard"
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            value={phoneNumber}
            onChange={(e) => {
              const enteredPhoneNumber = String(e.target.value).replace(
                /\D/g,
                ""
              );
              setPhoneNumber(enteredPhoneNumber);
            }}
            inputProps={{ maxLength: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={selectedState}
            onChange={handleStateChange}
          >
            {State.getStatesOfCountry("IN").map((state) => (
              <MenuItem key={state.isoCode} value={state.name}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="city"
            fullWidth
            autoComplete="state-city"
            variant="standard"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              handleCityChange(e.target.value); // Call onCityChange function with the updated value
            }}
            disabled={!selectedState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zipCode}
            onChange={(e) => {
              const enteredZip = e.target.value.replace(/\D/g, "");
              const limitedZip = enteredZip.slice(0, 6);
              setZipCode(limitedZip);
            }}
            disabled={!city}
            inputProps={{ maxLength: 6 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value="India"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#4caf50",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              outline: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
