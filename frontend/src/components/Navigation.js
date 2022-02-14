import React, {useEffect, useState} from "react";
import { Nav, Navbar, Container,  Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

  const [currentUser, setCurrentUser] = useState();
  const user = localStorage.getItem('username');
  let navigate = useNavigate();


  useEffect(()=> {

    const fetchCurrentUser = async () => {
      if(!user) return null;
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, [user]);


  
  function handleLogout(){
    navigate("/login");
    localStorage.setItem('username', "");
    localStorage.setItem('SavedToken', "")
    setCurrentUser();
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
            {currentUser? (<h4><Badge>{currentUser}</Badge></h4>
            
            ) : null}
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
