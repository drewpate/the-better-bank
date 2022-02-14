import React, {useEffect, useState} from "react";
import { Nav, Navbar, Container,  Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

  const [currentUser, setCurrentUser] = useState();
  const [show, setShow] = useState(false);

  useEffect(()=> {

    const fetchCurrentUser = async () => {
      const user = localStorage.getItem('username');
      if(!user) return null;
      JSON.parse(user);
      setCurrentUser(user);
      setShow(true);
    };
    fetchCurrentUser();
  }, [currentUser]);

  let navigate = useNavigate();

  
  function handleLogout(){
    navigate("/login");
    localStorage.clear()
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
            {show? (<Badge>{'No user logged in'}</Badge>) : (<Badge>{currentUser}</Badge>) }
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
