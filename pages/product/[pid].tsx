import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Button } from "react-bootstrap";
import Footer from "../../components/molecules/Footer";
import Header from "../../components/molecules/Header";
import { Product } from "../../interfaces/product";
import api from "../../services/api";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../../components/atoms/AddToCartButton";

function Product() {
  const router = useRouter();
  const { pid } = router.query;

  const [data, setData] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);
  const listItem = () =>
    api.get(`/Product/${pid}`).then((response) => {
      setLoading(false);
      setData(response.data);
    });

  useEffect(() => {
    listItem();
  }, [pid]);

  return (
    <div>
      <Header />

      <main>
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : data ? (
          <>
            <Head>
              <title>{data.name}</title>
              <meta name="description" content={data.desc} />
            </Head>
            <Container>
              <Row>
                <Col lg={3}>
                  <Image
                    src={data.img}
                    width={500}
                    height={500}
                    alt={data.desc}
                  />
                </Col>
                <Col lg={9}>
                  <h3>
                    <Link href={data.slug}>{data.name}</Link>
                  </h3>
                  <h4>{data.desc}</h4>

                  <h3>${data.price}</h3>
                  <AddToCartButton item={data} />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <p>No product</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Product;
