import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/molecules/Footer";
import api from "../services/api";
import { Product } from "../interfaces/product";
import { Button, Container, Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/molecules/Header";
import BannerHome from "../components/molecules/BannerHome";
import AddToCartButton from "../components/atoms/AddToCartButton";

const Home: NextPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listProducts = () => {
    api.get("/Product").then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  const mapPrices = data && data.map((item): number => parseInt(item.price));
  const productLowPrice = Math.min(...mapPrices);
  const featureProd =
    data &&
    data.find(
      (item) => parseInt(item.price) === productLowPrice && item.stock > 0
    );

  useEffect(() => {
    listProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
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
    <>
      <Header />
      {data && data.length && featureProd && (
        <BannerHome featureProd={featureProd} />
      )}
      <Container>
        <Head>
          <title>Homepage</title>
          <meta name="description" content="Add item to cart" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : data && data.length ? (
            <Carousel responsive={responsive} itemClass="p-3">
              {data.map((item: Product, index: number) => (
                <div key={index}>
                  <Image
                    src={item.img}
                    width={500}
                    height={500}
                    alt={item.desc}
                  />
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                  <p className="text-bold ">{item.desc}</p>
                  <div>${item.price}</div>
                  {item.stock > 0 ? (
                    <>
                      <p className="small">stock: {item.stock}</p>
                      <AddToCartButton item={item} />
                    </>
                  ) : (
                    <p className="small">Out of stock</p>
                  )}
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No product</p>
          )}
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
