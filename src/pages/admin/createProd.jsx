import React, { useState } from "react";
import supabase from "../../assets/config/SupabaseClient";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Divider } from "@mui/material";

const CreateProd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sold_out, setSold_out] = useState("");
  const [image, setImage] = useState("");
  const [formError, setFormError] = useState(null);
  const [formCorrect, setFormCorrect] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentName = name.trim();
    const currentPrice = price.trim();
    const currentDescription = description.trim();
    const currentCategory = category.trim();
    const currentSoldOut = String(sold_out);
    const currentImage = image.trim();

    if (
      !currentName ||
      !currentPrice ||
      !currentCategory ||
      !currentSoldOut ||
      !currentImage ||
      !currentDescription
    ) {
      setFormError({ text: "Please fill out all fields." });
      setTimeout(() => {
        setFormError(null);
      }, 2000);
      setFormCorrect(null); // Clear success message
      return;
    }

    try {
      const { data, error } = await supabase
        .from("DisplayProducts")
        .insert([
          {
            name: currentName,
            price: currentPrice,
            category: currentCategory,
            sold_out: currentSoldOut,
            image: currentImage,
            description: currentDescription,
          },
        ]);

      if (error) {
        setFormError({ text: error.message });
        setTimeout(() => {
          setFormError(null);
        }, 2000);
        setFormCorrect(null); // Clear success message
        return;
      }

      // Clear form
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setSold_out("");
      setImage("");

      setFormCorrect({ text: "Product created successfully!" });
      setTimeout(() => {
        setFormCorrect(null);
      }, 2000);
      setFormError(null); // Clear error message
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Create Product</Typography>
      <Divider />
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="price">Price</InputLabel>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => {
              const newValue = Math.max(0, parseFloat(e.target.value)); // Ensure non-negative value
              setPrice(newValue);
            }}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="image">Image URL</InputLabel>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="earrings">Earrings</MenuItem>
            <MenuItem value="necklace">Necklace</MenuItem>
            <MenuItem value="set">Set</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="sold_out">Sold Out</InputLabel>
          <Select
            id="sold_out"
            value={sold_out}
            onChange={(e) => setSold_out(e.target.value)}
            required
          >
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>

        {formError && formError.text && (
          <Typography color="error">{formError.text}</Typography>
        )}
        {formCorrect && formCorrect.text && (
          <Typography sx={{ color: "green" }}>{formCorrect.text}</Typography>
        )}
      </form>
    </Box>
  );
}

export default CreateProd;
