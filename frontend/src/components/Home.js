import React from "react";
import {Card} from 'react-bootstrap';
import {useState} from 'react';
import CreateAccount from "./CreateAccount";
import {Button} from 'react-bootstrap';
import img from "../assets/images/bank.png";

const Home = () => {
  
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(false);

  return (
  <div className="container">
    {show? <Card style={{
        width: "18rem",
        height: "600",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        marginTop: 50,
      }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Welcome to the Better Bank</Card.Title>
        <Card.Text>
          (The Bad Bank 2.0)
          <br /> 
        </Card.Text>
        <Button variant="primary" onClick={handleShow} >
          Let's Get Started
        </Button>
      </Card.Body>
    </Card> : <CreateAccount/>}
      
  </div>
)};
    

export default Home;
