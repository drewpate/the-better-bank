import React from "react";
import { useEffect } from "react";
import Card from "./Card";

const MyAccount = () => {
  const email = "elizabeth@example.com";
  useEffect(() => {
    //fetch logged in account from API
    fetch(`users/${email}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);
  return (
    <div>
      <Card header="Balances" />
    </div>
  );
};

export default MyAccount;
