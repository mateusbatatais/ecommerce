import api from "../services/api";
import { Product } from "../interfaces/product";
import { Cart } from "../interfaces/cart";

const AddToCart = (product: Product) => {
  let cart: Cart[] = [];
  let foundProduct: any = {};
  api
    .get("/cart")
    .then(async (response) => {
      await cart.push(...response.data);
    })
    .then(() => {
      foundProduct = cart && cart.find((item: Cart) => item.id === product.id);
      if (foundProduct && foundProduct !== undefined) {
        api.put(`/cart/${foundProduct.id}`, {
          amount: foundProduct.amount + 1,
        });
      } else {
        api.post(`/cart/`, {
          name: product.name,
          productId: product.id,
          amount: 1,
        });
      }
    });
};

export default AddToCart;
