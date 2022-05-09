import "../css/App.scss";
import type { AppProps } from "next/app";
import ToastProvider from "../context/Toast";
import CartProvider from "../context/Cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <CartProvider>
        <Component {...pageProps} />;
      </CartProvider>
    </ToastProvider>
  );
}

export default MyApp;
