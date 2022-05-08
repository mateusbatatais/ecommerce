import styles from "./style.module.scss";
import { Product } from "../../../interfaces/product";
import { Container, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../../atoms/AddToCartButton";

interface Props {
  featureProd: Product;
}

function BannerHome({ featureProd }: Props) {
  return (
    <div className={`${styles.banner} mb-4 py-4`}>
      <Container>
        <h2>Best price for you!</h2>
        <Row>
          <Col lg={3}>
            <Image
              src={featureProd.img}
              width={500}
              height={500}
              alt={featureProd.desc}
            />
          </Col>
          <Col lg={9}>
            <h3>
              <Link href={featureProd.slug}>{featureProd.name}</Link>
            </h3>
            <h4>{featureProd.desc}</h4>

            <h3>${featureProd.price}</h3>
            <AddToCartButton item={featureProd} variant="light" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BannerHome;
