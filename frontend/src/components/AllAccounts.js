import React from "react";
import { useState } from "react";
import Card from "./Card";


const AllAccounts = () => {
  const [data, setData] = useState([]);
  React.useEffect(() => {
    //fetch all account from API
    try {
      fetch("api/users", { headers: { Authorization:localStorage.getItem('SavedToken')}})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData({ users: data });
      });
    } catch (error) {
      console.log(error.message); 
    }
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
