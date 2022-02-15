import React, { useState } from "react";
 // Typically if you're importing two things from the same library, then condense the import into one line
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const AllAccounts = () => {
  const [data, setData] = useState([]);
  let navigate = useNavigate()

  React.useEffect(() => {
    // Check for user in localstorage
    let token = localStorage.getItem('SavedToken')
    if (!token) return navigate('/login')

    // Fetch all account from API
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
  return data.users?.length ? data.users?.map((user, item) => (
        <Card
          txtcolor="black"
          key={`user-${item}`} // Using index as key is not recommended. Something like this would be a little better. https://medium.com/wesionary-team/using-index-as-a-key-is-an-anti-pattern-in-react-8e5db3aea3a9
          header={`Username: ${user.username}`}
          text={`Email: ${user.email}`}
          text2={`Password: ${user.password}`}
          body={`Checking Balance: ${user.checkingBalance}`}
          body2={`Savings Balance: ${user.savingsBalance}`}
        />
      )) : null
};

export default AllAccounts;
