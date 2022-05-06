import styles from "./style.module.scss";
import { Product } from "../../../interfaces/product";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "../../../utils/AddToCart";

interface Props {
  featureProd: Product;
}

function BannerHome({ featureProd }: Props) {
  return (
    <div className={`${styles.banner} mb-4 py-4`}>
      <Container>
        <h2>Best price for you!</h2>
        <h1>
          <Link href={featureProd.slug}>{featureProd.name}</Link>
        </h1>
        <h2>{featureProd.desc}</h2>

        <Image
          src={featureProd.img}
          width={500}
          height={500}
          alt={featureProd.desc}
        />
        <p className="text-bold ">{featureProd.desc}</p>
        <div>${featureProd.price}</div>
        <Button onClick={() => AddToCart(featureProd)}>Add to cart</Button>
      </Container>
    </div>
  );
}

export default BannerHome;
