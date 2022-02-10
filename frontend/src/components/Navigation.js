import { Nav, Navbar, Container, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  let navigate = useNavigate();

  const DisplayName = (props) => (
    <h4>
      <Badge>{props.name}</Badge>
    </h4>
  );
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
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/allaccounts">All Accounts</Nav.Link>
            </Nav>
            <DisplayName name="John" />
            <Button
              variant="outline-sucess"
              onClick={() => {
                navigate("/home");
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
