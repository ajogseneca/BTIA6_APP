import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const token = readToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleNavbarToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavLink = () => {
    setIsExpanded(false);
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary " expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Ajo George</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={handleNavLink} active={router.pathname === "/"}>
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link onClick={handleNavLink} active={router.pathname === "/search"}>
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Nav className="ml-auto">
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={handleNavLink} active={router.pathname === "/favourites"}>
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={handleNavLink} active={router.pathname === "/history"}>
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!token && (
              <Nav className="ml-auto">
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/register"}>
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/login"}>
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchField}
              onChange={handleSearchChange}
            />
            &nbsp;
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Form>
          &nbsp;
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};
