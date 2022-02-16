import React, {useEffect, useState, useCallback} from "react";
import { Nav, Navbar, Container,  Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {

  const [currentUser, setCurrentUser] = useState([]);
  let navigate = useNavigate();


  // useEffect(()=> {

  //   const fetchCurrentUser = async () => {
  //     if(!user) return null;
  //     setCurrentUser(user);
  //   };
  //   fetchCurrentUser();
  // }, [user]);

  const fetchCurrentUser = useCallback(() => {
    const user = localStorage.getItem('username');
    if (!user) return;
    setCurrentUser(user);
  }, []);
  
  useEffect(fetchCurrentUser, [fetchCurrentUser]);


  
  function handleLogout(){
    localStorage.setItem('username', "");
    localStorage.setItem('SavedToken', "")
    setCurrentUser([]);
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
            {currentUser?  (
            <h4>
              <Badge>{props.user || localStorage.getItem('username')}
            </Badge>
            </h4>
            ): null}
            <Button onClick={handleLogout}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
