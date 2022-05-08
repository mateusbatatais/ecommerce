import "../css/App.scss";
import type { AppProps } from "next/app";
import ToastProvider from "../context/Toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />;
    </ToastProvider>
  );
}

export default MyApp;
