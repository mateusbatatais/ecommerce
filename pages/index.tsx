import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/molecules/Footer";
import styles from "../css/Home.module.scss";
import api from "../services/api";
import { Product } from "../interfaces/product";
import { Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home: NextPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listItems = () => {
    api.get("/Product").then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  useEffect(() => {
    listItems();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Add to cart test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Exemplo uso carrinho</h1>

        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : data && data.length ? (
          <Carousel responsive={responsive}>
            {data.map((item: Product, index: number) => (
              <div key={index}>{item.name}</div>
            ))}
          </Carousel>
        ) : (
          <p>Nada a exibir</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;