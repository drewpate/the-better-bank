import React, {useState} from "react";
import Card from "./Card";


const MyAccount = () => {
  const [data, setData] = useState([]);
  
  React.useEffect(() => {
    const username = JSON.parse(localStorage.getItem('username'));
    // const username = localStorage.getItem('username')
    try {
      fetch(`api/users/account/${username}`, {
        headers: {
          Authorization: localStorage.getItem('SavedToken')
        }})
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setData(data)
        })

      } catch (err) {
        throw new Error (err.message)
      };
      
  }, [])

  return (
    <>
        <Card
          txtcolor="black"
          key={data._id}
          header={`Balances`}
          body={`Checking Balance: ${data.checkingBalance}`}
          body2={`Savings Balance: ${data.savingsBalance}`}
        />
    </>
  );
};

export default MyAccount;
