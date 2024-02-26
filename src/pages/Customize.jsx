import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import supabase from "../assets/config/SupabaseClient";


const CustomizePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    productDetails: "",
    imageFile: null,
    imageUrl: "", // New state to store the URL of the uploaded image
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
  
    // Enforce input format for phone number (allow only numbers)
    if (name === "contact") {
      newValue = newValue.replace(/\D/g, ""); // Remove any non-digit characters
    }
  
    // Enforce input format for name (allow only characters)
    if (name === "name") {
      newValue = newValue.replace(/[^A-Za-z]/gi, ""); // Remove any non-letter characters
    }
  
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formDataCopy = { ...formData }; // Create a copy of formData
    formDataCopy.imageFile = file;
    
    // Read the image file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
        formDataCopy.imageUrl = e.target.result; // Set data URL as image URL
        setFormData(formDataCopy);
    };
    reader.readAsDataURL(file);
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form validation
    if (!formData.name || !formData.contact || !formData.productDetails ) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill in all fields");
      setSnackbarOpen(true);
      return;
    }
    if (formData.contact.length !== 10) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Contact number must be 10 digits");
      setSnackbarOpen(true);
      return;
    }
    if (formData.name.length > 20) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Name must be 20 characters or fewer");
      setSnackbarOpen(true);
      return;
    }

    // Handle form submission logic here
    // For demo purposes, let's assume the submission was successful
    setSnackbarSeverity("success");
    setSnackbarMessage("Thank you! Our team will contact you about the product.");
    setSnackbarOpen(true);
    console.log(formData);

    // add to supabase
    try{
        const { error } = await supabase
        .from('custom')
        .insert([
          {
            user_name: formData.name,
            user_contact: formData.contact,
            prod_description: formData.productDetails,
            prod_image: formData.imageUrl,
          }
        ]);
        if(error){
          console.log(error)
        }
    }catch{
        console.log('!')
    }

    // Reset form fields
    setFormData({
      name: "",
      contact: "",
      productDetails: "",
      imageFile: null,
      imageUrl: "",
    });
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Create Your Own <span style={{ color: "#957461" }}>Jewellery</span>
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="user-name"
                required
                fullWidth
                id="username"
                label="Name"
                placeholder="Enter your name here"
                variant="standard"
                autoFocus
                sx={{ borderBottom: "1px solid" }}
                name="name"
                value={formData.name}
                onChange={handleChange}
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="contact"
                label="contact"
                placeholder="Enter your whatsapp contact number"
                id="contact"
                autoComplete="tel"
                variant="standard"
                type="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                sx={{ borderBottom: "1px solid black" }}
                value={formData.contact}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                component="label"
                variant="contained"
                style={{ height: "56px" }}
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: "#957461",
                  "&:hover": {
                    backgroundColor: "#685043",
                  },
                }}
              >
                Upload Image / Product Design ( Optional )
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Display uploaded image */}
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="content"
                label="Product Info"
                placeholder="Describe the product you want to customize. It can be a product from the website or an entirely new one"
                multiline
                variant="standard"
                sx={{ borderBottom: "1px solid black" }}
                name="productDetails"
                value={formData.productDetails}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#957461",
              "&:hover": {
                backgroundColor: "#685043",
              },
            }}
          >
            Submit
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

export default CustomizePage;
