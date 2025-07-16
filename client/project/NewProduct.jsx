import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";
import auth from "../lib/auth-helper";
import { create } from "./api-product.js";
import { Link, Navigate, useParams } from "react-router-dom";

export default function NewProduct() {
  const theme = useTheme();
  const params = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
    price: "",
    redirect: false,
    error: "",
  });

  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    let productData = new FormData();
    values.name && productData.append("name", values.name);
    values.description && productData.append("description", values.description);
    values.image && productData.append("image", values.image);
    values.category && productData.append("category", values.category);
    values.quantity && productData.append("quantity", values.quantity);
    values.price && productData.append("price", values.price);

    create({ shopId: params.shopId }, { t: jwt.token }, productData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "", redirect: true });
        }
      }
    );
  };

  if (values.redirect) {
    return <Navigate to={`/seller/shop/edit/${params.shopId}`} />;
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        mt: 5,
        pb: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 2, color: theme.palette.primary.main }}
        >
          New Product
        </Typography>

        <input
          accept="image/*"
          onChange={handleChange("image")}
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
        />
        <label htmlFor="icon-button-file">
          <Button
            variant="contained"
            color="secondary"
            component="span"
            startIcon={<AddPhotoAlternateIcon />}
          >
            Upload Photo
          </Button>
        </label>
        <span style={{ marginLeft: "10px" }}>
          {values.image ? values.image.name : ""}
        </span>

        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        <TextField
          id="multiline-flexible"
          label="Description"
          multiline
          rows="2"
          value={values.description}
          onChange={handleChange("description")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        <TextField
          id="category"
          label="Category"
          value={values.category}
          onChange={handleChange("category")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        <TextField
          id="quantity"
          label="Quantity"
          type="number"
          value={values.quantity}
          onChange={handleChange("quantity")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        <TextField
          id="price"
          label="Price"
          type="number"
          value={values.price}
          onChange={handleChange("price")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 2 }}>
            <Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          sx={{ mx: 1, mb: 2 }}
        >
          Submit
        </Button>
        <Link
          to={`/seller/shop/edit/${params.shopId}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" sx={{ mx: 1, mb: 2 }}>
            Cancel
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
