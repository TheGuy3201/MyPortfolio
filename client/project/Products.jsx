import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddToCart from "./../cart/AddToCart";

export default function Products({ products, searched }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        bgcolor: "background.paper",
        textAlign: "left",
        px: 1,
      }}
    >
      {products.length > 0 ? (
        <Box sx={{ width: "100%", pb: "14px" }}>
          <ImageList
            sx={{ width: "100%", minHeight: 200, py: "16px" }}
            cols={3}
            rowHeight={200}
          >
            {products.map((product, i) => (
              <ImageListItem key={i} sx={{ textAlign: "center" }}>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`/api/product/image/${product._id}`}
                    alt={product.name}
                    loading="lazy"
                    style={{ height: "100%" }}
                  />
                </Link>
                <ImageListItemBar
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.72)",
                    textAlign: "left",
                  }}
                  title={
                    <Link
                      to={`/product/${product._id}`}
                      style={{
                        fontSize: "1.1em",
                        marginBottom: "5px",
                        color: "rgb(189, 222, 219)",
                        display: "block",
                        textDecoration: "none",
                      }}
                    >
                      {product.name}
                    </Link>
                  }
                  subtitle={<span>$ {product.price}</span>}
                  actionIcon={<AddToCart item={product} />}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        searched && (
          <Typography variant="subtitle1" component="h4" sx={{ p: 3 }}>
            No products found! :()
          </Typography>
        )
      )}
    </Box>
  );
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
};
