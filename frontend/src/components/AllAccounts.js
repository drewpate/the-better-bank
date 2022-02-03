import React from "react";
import { useState } from "react";
import Card from "./Card";

const AllAccounts = () => {
  const [data, setData] = useState([]);
  React.useEffect(() => {
    //fetch all account from API
    fetch("/account/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData({ users: data });
      });
  }, []);

  return (
    <>
      {data.users?.map((user, item) => (
        <Card
          txtcolor="black"
          key={item}
          header={`Username: ${user.username}`}
          text={`Email: ${user.email}`}
          text2={`Password: ${user.password}`}
          body={`Checking Balance: ${user.checkingBalance}`}
          body2={`Savings Balance: ${user.savingsBalance}`}
        />
      ))}
    </>
  );
};

export default AllAccounts;
