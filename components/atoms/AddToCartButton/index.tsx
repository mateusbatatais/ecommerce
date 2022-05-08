import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Product } from "../../../interfaces/product";
import { useToast } from "../../../context/Toast";
import { Cart } from "../../../interfaces/cart";
import api from "../../../services/api";

interface Props {
  item: Product;
  variant?: string;
}

function AddToCartButton({ item, variant }: Props) {
  const { setToast } = useToast();
  const [cart, setCart] = useState<Cart[]>([]);
  const [foundProduct, setFoundProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const listCart = () => {
    api.get("/cart").then((response) => {
      setCart(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    listCart();
    setFoundProduct(cart && cart.find((cart: Cart) => cart.id === item.id));
  }, []);

  const addToCart = () => {
    const updateCartItem = () => {
      api.put(`/cart/${item.id}`, {
        amount: foundProduct.amount + 1,
      });
      setToast(true);
      listCart();
    };

    const addItemToCart = () => {
      api.post(`/cart/`, {
        name: item.name,
        productId: item.id,
        amount: 1,
      });
      setToast(true);
      listCart();
    };

    foundProduct && foundProduct !== undefined
      ? updateCartItem()
      : addItemToCart();
  };

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
          onClick={() => addToCart()}
          variant={variant ? variant : "primary"}
        >
          Add to cart
        </Button>
      )}
    </>
  );
}

export default AddToCartButton;
