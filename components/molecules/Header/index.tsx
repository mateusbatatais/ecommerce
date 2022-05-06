import React, { useEffect, useState } from "react";
import { Cart } from "../../../interfaces/cart";
import {
  ToastContainer,
  Toast,
  Container,
  Nav,
  NavDropdown,
  Spinner,
  Badge,
} from "react-bootstrap";
import styles from "./style.module.scss";
import api from "../../../services/api";

function Header() {
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listItems = () => {
    api.get("/cart").then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  useEffect(() => {
    listItems();
  }, []);

  return (
    <header className="bgBlack text-light-custom">
      <Container>
        <ToastContainer className="p-3" position="top-center">
          <Toast
            onClose={() => setAlert(false)}
            show={alert}
            bg="success"
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white">
              Item successfully added to cart
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <Nav
          className={`${styles.menuNav} menuNav text justify-content-end py-4`}
          activeKey="/home"
        >
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">How it works</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Contact</Nav.Link>
          </Nav.Item>
          <NavDropdown title="🛒" id="nav-dropdown">
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : data && data.length ? (
              <div className={`${styles.dpDown} px-3`}>
                {data.map((item: Cart, index: number) => (
                  <>
                    <div className="small" key={index}>
                      {item.name}{" "}
                      <Badge pill className="ms-2">
                        {item.amount}
                      </Badge>
                    </div>
                    <hr className="my-2" />
                  </>
                ))}
              </div>
            ) : (
              <p className="px-3">cart empty</p>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
