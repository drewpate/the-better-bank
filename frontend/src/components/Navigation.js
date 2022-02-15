import React, {useEffect, useState} from "react";
import { Nav, Navbar, Container,  Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

  const [currentUser, setCurrentUser] = useState();
  const user = localStorage.getItem('username');
  let navigate = useNavigate();


  useEffect(() => {
    // Strongly recommend moving this out of the useEffect and into a useCallback to prevent computer sounding like a jet engine
    const fetchCurrentUser = () => {
      if(!user) return null;
      setCurrentUser(user); // Will cause infinite render loop in the case that there is a user signed in
    };
    fetchCurrentUser();
  }, [user]);


  function handleLogout() {
    navigate("/login"); // Would recommend placing this after the below logic so we're able to do everything needed for a successful logout before the page is unloaded
    localStorage.removeItem('username');
    localStorage.removeItem('SavedToken'); // The localStorage API has built in methods to remove values https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
    setCurrentUser([]); // Initialize back to the empty array rather than nothing
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
            {currentUser ? (<h4><Badge>{currentUser}</Badge></h4>
            
            ) : null}
            <Button
              variant="outline-success" // Minor spelling error
              onClick={ handleLogout } // Slight simplification
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
