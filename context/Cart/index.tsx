import React, { createContext, useState, useContext, useEffect } from "react";
import { Cart } from "../../interfaces/cart";
import { Product } from "../../interfaces/product";
import api from "../../services/api";
import { useToast } from "../Toast";

const CartContext = createContext<any | null>(null);

export default function CartProvider({ children }: any) {
  const { setToast } = useToast();
  const [cart, setCart] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listCart = () => {
    api.get("/cart").then((response) => {
      setCart(response.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    listCart();
  }, [loading]);

  const addToCart = (item: Product) => {
    const foundProduct =
      cart && cart.find((cart: Cart) => cart.productId === item.id);
    setLoading(true);

    const updateCartItem = () => {
      foundProduct &&
        api.put(`/cart/${foundProduct.id}`, {
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
    <CartContext.Provider value={{ cart, setCart, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  const { cart, setCart, addToCart, loading }: any = context;
  return { cart, setCart, addToCart, loading };
}
