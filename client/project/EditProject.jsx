import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Avatar,
  Icon,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";
import auth from "../lib/auth-helper.js";
import { read, update } from "./api-product.js";
import { Link, Navigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const params = useParams();
  const theme = useTheme();

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

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ productId: params.productId }, signal).then((data) => {
      if (data.error) {
        setValues(prev => ({ ...prev, error: data.error }));
      } else {
        setValues(prev => ({
          ...prev,
          id: data._id,
          name: data.name,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          price: data.price,
        }));
      }
    });
    return () => {
      abortController.abort();
    };
  }, [params.productId]);

  const clickSubmit = () => {
    let productData = new FormData();
    values.name && productData.append("name", values.name);
    values.description && productData.append("description", values.description);
    values.image && productData.append("image", values.image);
    values.category && productData.append("category", values.category);
    values.quantity && productData.append("quantity", values.quantity);
    values.price && productData.append("price", values.price);

    update(
      {
        shopId: params.shopId,
        productId: params.productId,
      },
      { t: jwt.token },
      productData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const imageUrl = values.id
    ? `/api/product/image/${values.id}?${new Date().getTime()}`
    : "/api/product/defaultphoto";

  if (values.redirect) {
    return <Navigate to={`/seller/shop/edit/${params.shopId}`} />;
  }

  return (
    <div>
      <Card
        sx={{
          margin: "auto",
          textAlign: "center",
          mt: 3,
          mb: 2,
          maxWidth: 500,
          pb: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mt: 2, color: theme.palette.primary.main }}
          >
            Edit Product
          </Typography>

          <Avatar
            src={imageUrl}
            sx={{ width: 60, height: 60, margin: "auto", mt: 2, mb: 2 }}
          />

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
              Change Image
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
            sx={{ mx: 1, width: 400 }}
          />

          <TextField
            id="description"
            label="Description"
            multiline
            rows={3}
            value={values.description}
            onChange={handleChange("description")}
            margin="normal"
            sx={{ mx: 1, width: 400 }}
          />

          <TextField
            id="category"
            label="Category"
            value={values.category}
            onChange={handleChange("category")}
            margin="normal"
            sx={{ mx: 1, width: 400 }}
          />

          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            value={values.quantity}
            onChange={handleChange("quantity")}
            margin="normal"
            sx={{ mx: 1, width: 400 }}
          />

          <TextField
            id="price"
            label="Price"
            type="number"
            value={values.price}
            onChange={handleChange("price")}
            margin="normal"
            sx={{ mx: 1, width: 400 }}
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
            Update
          </Button>
          <Link
            to={`/seller/shops/edit/${params.shopId}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" sx={{ mx: 1, mb: 2 }}>
              Cancel
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
