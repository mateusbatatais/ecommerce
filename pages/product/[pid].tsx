import { useRouter } from "next/router";

function Product() {
  const router = useRouter();
  const { pid } = router.query;

  return <div>{pid}</div>;
}

export default Product;
