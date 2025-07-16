import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddToCart from "./../cart/AddToCart";
import { read, listRelated } from "./api-product.js";
import { Link } from "react-router-dom";
import Suggestions from "./Suggestions";

export default function Product({ match }) {
  const [product, setProduct] = useState({ shop: {} });
  const [suggestions, setSuggestions] = useState([]);
  const [_error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ productId: match.params.productId }, signal).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });

    return () => abortController.abort();
  }, [match.params.productId]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listRelated({ productId: match.params.productId }, signal).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuggestions(data);
      }
    });

    return () => abortController.abort();
  }, [match.params.productId]);

  const imageUrl = product._id
    ? `/api/product/image/${product._id}?${new Date().getTime()}`
    : "/api/product/defaultphoto";

  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <CardHeader
              title={product.name}
              subheader={product.quantity > 0 ? "In Stock" : "Out of Stock"}
              action={
                <Box sx={{ display: "inline-block", m: 1 }}>
                  <AddToCart
                    item={product}
                    cartStyle={{
                      width: "35px",
                      height: "35px",
                      padding: "10px 12px",
                      borderRadius: "0.25em",
                      backgroundColor: "#5f7c8b",
                    }}
                  />
                </Box>
              }
            />
            <Box sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: "50%", height: 200, ml: 3 }}
                image={imageUrl}
                title={product.name}
              />
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 2, color: "text.primary" }}
                >
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#93c5ae3d",
                    color: "#375a53",
                    fontSize: "1.3em",
                    p: 2,
                    mb: 2,
                    display: "inline-block",
                  }}
                >
                  $ {product.price}
                </Box>
                <Box>
                  <Link
                    to={`/shops/${product.shop._id}`}
                    style={{
                      color: "#3e4c54b3",
                      fontSize: "0.9em",
                      textDecoration: "none",
                    }}
                  >
                    <ShoppingBasketIcon
                      sx={{ verticalAlign: "sub", fontSize: "1rem", mr: 0.5 }}
                    />
                    {product.shop.name}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        {suggestions.length > 0 && (
          <Grid item xs={12} md={5}>
            <Suggestions products={suggestions} title="Related Products" />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
