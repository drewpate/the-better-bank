import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import MyCard from './MyCard'
import {Button} from 'react-bootstrap'



const AllAccounts = () => {

  const [data, setData] = useState([]);
  let navigate = useNavigate()

  React.useEffect(() => {

    //Check for user in localstorage
    let token = localStorage.getItem('SavedToken')
    if(!token) return navigate('/login')
    //Fetch all accounts from API
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
  }, [navigate]);
  
   // If there are no users (length === 0 === false) then return `null` to explicity render nothing 
  return data.users?.length? data.users?.map((user, item) => (

        <MyCard
          txtcolor="black"
          key={`user-${item}`}
          header={`Username: ${user.username}`}
          text={`Email: ${user.email}`}
          text2={`Password: ${user.password}`}
          body={`Checking Balance: ${user.checkingBalance}`}
          body2={`Savings Balance: ${user.savingsBalance}`}
          button={<Button style={{margin: 20}}>Delete User</Button>}
        />
      
      )) : null
};

export default AllAccounts;
