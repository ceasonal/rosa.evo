import React, { useState, useEffect } from "react";
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


const UpdateProd = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sold_out, setSold_out] = useState("");
  const [image, setImage] = useState("");
  const [formError, setFormError] = useState(null);
  const [formCorrect, setFormCorrect] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = parseInt(id, 10);
        
        const { data, error } = await supabase
          .from("DisplayProducts")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) {
          setFormError({ text: "Error fetching product details." });
          setTimeout(() => {
            setFormError(null);
          }, 5000);
          setFormCorrect(null);
          setName("");
          setPrice("");
          setDescription("");
          setCategory("");
          setSold_out("");
          setImage("");
          return;
        }

        if (data) {
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
          setCategory(data.category);
          setSold_out(data.sold_out);
          setImage(data.image);
        } else {
          setFormError({ text: "Product not found with the provided ID." });
          setTimeout(() => {
            setFormError(null);
          }, 2000);
          setFormCorrect(null); 
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProductDetails();
    }else {
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setSold_out("");
        setImage("");
      }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentName = name.trim();
    const currentPrice = price ? price.toString().trim() : "";
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
      setFormCorrect(null); 
      return;
    }

    try {
      const { data, error } = await supabase
        .from("DisplayProducts")
        .upsert([
          {
            id: id,
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

      setFormCorrect({ text: "Product updated successfully!" });
      setTimeout(() => {
        setFormCorrect(null);
      }, 2000);
      setFormError(null); // Clear error message
      setId("");
      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      setSold_out("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("DisplayProducts")
        .delete()
        .eq("id", id);

      if (error) {
        setFormError({ text: "Error deleting product." });
        setTimeout(() => {
          setFormError(null);
        }, 2000);
        setFormCorrect(null); // Clear success message
        return;
      }

      setFormCorrect({ text: "Product deleted successfully!" });
      setTimeout(() => {
        setFormCorrect(null);
      }, 2000);

      // Reset form fields after deletion
      setId("");
      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      setSold_out("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Update Product</Typography>
      <Divider />
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="id">Product ID</InputLabel>
          <Input
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </FormControl>

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
              const newValue = Math.max(0, parseFloat(e.target.value)); 
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
          Update Product
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ marginLeft: "10px" }}
        >
          Delete Product
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
};

export default UpdateProd;
