import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";


const MyAccount = () => {
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  
  React.useEffect(() => {
    const username = localStorage.getItem('username');
    if(!username) return navigate('/login');

      fetch(`api/users/account/${username}`, {
        headers: {
          Authorization: localStorage.getItem('SavedToken')
        }})
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        }).catch(e => console.error("Something went wrong while getting account details", e))
      
  }, [navigate])

  return (
        <Card
          txtcolor="black"
          key={data._id}
          header={`Balances`}
          body={`Checking Balance: ${data.checkingBalance}`}
          body2={`Savings Balance: ${data.savingsBalance}`}
        />
  );
};

export default MyAccount;
