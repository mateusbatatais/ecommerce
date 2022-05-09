import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Product } from "../../../interfaces/product";
import { useCart } from "../../../context/Cart";
interface Props {
  item: Product;
  variant?: string;
}

function AddToCartButton({ item, variant }: Props) {
  const { addToCart, loading } = useCart();

  return (
    <>
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <Button
          onClick={() => addToCart(item)}
          variant={variant ? variant : "primary"}
        >
          Add to cart
        </Button>
      )}
    </>
  );
}

export default AddToCartButton;
