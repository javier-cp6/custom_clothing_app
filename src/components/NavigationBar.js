import { useState, useEffect } from "react";

import { Container, Navbar, Nav, Button, Form, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";

import { getCategories } from "../services/categoryService";

export default function NavigationBar() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const arrCategories = await getCategories(page, limit);
        setCategories([...categories, ...arrCategories]);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoriesData();
  }, [page]);

  return (
    <>
      <Navbar bg="light" expand="sm" variant="light">
        <Container className="justify-content-end">
          <Button href={`/favs`}variant="dark ms-2">Favs</Button>
          <Button href={`/cart`} variant="dark ms-2">Cart</Button>
          <Button variant="dark ms-2">Login</Button>
        </Container>
      </Navbar>
      <Navbar bg="light" expand="sm" variant="light">
        <Container>
          <Navbar.Brand className="fw-bold fs-4" href="/">
            *LA CONSIGNE*
          </Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="sm" variant="light">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#link">Creators</Nav.Link>
              {categories.map(({ cat_name, cat_id }, i) => (
                <Nav.Link href={`/category/${cat_id}`} key={i}>
                  {cat_name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
