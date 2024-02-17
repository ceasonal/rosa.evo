import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { State, City } from "country-state-city";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import supabase from "../../assets/config/SupabaseClient";
export default function AddressForm() {
  // Initialize states
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isoCode, setIsoCode] = useState("");
  const [citiesInSelectedState, setCitiesInSelectedState] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState(null); 

  // Function to handle state change
  const handleStateChange = (event) => {
    const stateName = event.target.value;
    const code = State.getStatesOfCountry("IN").find(
      (state) => state.name === stateName
    ).isoCode;
    setSelectedState(stateName);
    console.log("Selected state:", code);

    // Get cities of the selected state
    const cities = City.getCitiesOfState("IN", code);
    setCitiesInSelectedState(cities);
    // Reset selected city and zip code
    setSelectedCity("");
    setZipCode("");
  };

  // Function to handle city change
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    // Reset zip code when city changes
    setZipCode("");
  };

  // Function to check if all fields are filled
  useEffect(() => {
    if (
      selectedState !== "" &&
      selectedCity !== "" &&
      zipCode !== "" &&
      document.getElementById("firstName").value !== "" &&
      document.getElementById("lastName").value !== "" &&
      document.getElementById("address1").value !== "" &&
      document.getElementById("phone").value !== ""
    ) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [selectedState, selectedCity, zipCode]);

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("user").upsert([
        {
          first_name: document.getElementById("firstName").value,
          last_name: document.getElementById("lastName").value,
          address: document.getElementById("address1").value,
          phone: document.getElementById("phone").value,
          state: selectedState,
          city: selectedCity,
          zip_code: zipCode,
          user_uuid: user.id,
        },
      ]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
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
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
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
          />
        </Grid>
        <Grid item xs={12}>
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
              const enteredPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
              setPhoneNumber(enteredPhoneNumber);
            }}
            inputProps={{ maxLength: 10 }} // Maximum length including country code (+91) is 12
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
            select
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            variant="standard"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState} // Disable city dropdown if state is not selected
          >
            {citiesInSelectedState.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
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
              // Ensure only digits are entered
              const enteredZip = e.target.value.replace(/\D/g, "");
              // Ensure only first 6 digits are considered
              const limitedZip = enteredZip.slice(0, 6);
              // Update zip code state
              setZipCode(limitedZip);
            }}
            disabled={!selectedCity} // Disable zip code input if city is not selected
            inputProps={{ maxLength: 6 }} // Limit input to 6 characters visually
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
            disabled // Disable country field
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            disabled={!formCompleted}
            sx={{
              backgroundColor: formCompleted ? "#4caf50" : "#cccccc",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: formCompleted ? "pointer" : "not-allowed",
              outline: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
