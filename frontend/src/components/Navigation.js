import React from "react";
import { Nav, Navbar, Container,  Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

   

  let navigate = useNavigate();
  
  function handleLogout(){
    localStorage.setItem('SavedToken', "");
    localStorage.setItem('username', "")
    navigate("/login");
  }
  

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">The Better Bank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/myaccount">My Account</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/allaccounts">All Accounts</Nav.Link>
            </Nav>
            <Button
              variant="outline-sucess"
              onClick={() => {
                handleLogout()
              }}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
