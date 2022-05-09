import React, { useEffect, useState } from "react";
import { Cart } from "../../../interfaces/cart";
import { useCart } from "../../../context/Cart";

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
import { useToast } from "../../../context/Toast";

function Header() {
  const { toast, setToast } = useToast();
  const { cart, listCart, loading } = useCart();

  useEffect(() => {
    listCart();
  }, [cart]);

  return (
    <header className="bgBlack text-light-custom">
      <Container>
        <ToastContainer className="p-3 position">
          <Toast
            className={styles.customToast}
            onClose={() => setToast(false)}
            show={toast}
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
            ) : cart && cart.length ? (
              <div className={`${styles.dpDown} px-3`}>
                {cart.map((item: Cart, index: number) => (
                  <div className="small" key={index}>
                    {item.name}
                    <Badge pill className="ms-2">
                      {item.amount}
                    </Badge>
                  </div>
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
