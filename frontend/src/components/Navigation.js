import React, {useEffect, useState} from "react";
import { Nav, Navbar, Container,  Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

  const [currentUser, setCurrentUser] = useState();
  const user = localStorage.getItem('username');


  useEffect(()=> {

    const fetchCurrentUser = async () => {
      if(!user) return null;
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, [user]);

//   const fetchCurrentUser = useCallback(() => {
//     if (!user) return;
//     setCurrentUser(user);
//     console.log('hi from below');

//   }, []);
// useEffect(fetchCurrentUser, [fetchCurrentUser]);

  let navigate = useNavigate();

  
  function handleLogout(){
    navigate("/login");
    localStorage.clear()
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
            {currentUser? (<Badge>{currentUser}</Badge>
            
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
