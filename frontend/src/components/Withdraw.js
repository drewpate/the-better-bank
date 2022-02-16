import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import MyCard from '../components/MyCard'

function Withdraw() {
  
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  React.useEffect(() => {
    const username = localStorage.getItem('username');

    
    try {
      fetch(`api/users/account/${username}`, {
        headers: {
          Authorization:localStorage.getItem('SavedToken')
        }})
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
      } catch (err) {
        throw new Error (err.message)
      };
      setBalance(data.checkingBalance);
      console.log(data.checkingBalance);
    }, [data.checkingBalance])

    

    
    


  const WithdrawSchema = Yup.object().shape({
    withdrawAmount: Yup.number("Please enter a number")
      .min(1)
      .required("Required")
      .positive()
      .integer(),
  });


 return (
    <div className="container">
      <MyCard
        className="mx-auto"
        header="Withdraw"
        txtcolor="black"
        body={
          <Formik
            initialValues={{
              withdrawAmount: 0,
            }}
            validationSchema={WithdrawSchema}
            onSubmit={(values, {resetForm}) => {
              (async () => {
              try {
                if (values.withdrawAmount > data.checkingBalance)
                  setShowError(true);
                  setShowSuccessMessage(false);
                  const username = localStorage.getItem('username');
                  fetch("api/users/transactions", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem('SavedToken')},
                    body: JSON.stringify
                    ({
                        username: `${username}`,
                        checkingBalance: - JSON.parse(`${values.withdrawAmount}`),
                        savingsBalance:  - JSON.parse(`${values.withdrawAmount}`)
                    })
                  })
                  setBalance(data.checkingBalance - values.withdrawAmount);
                } catch (error) {
                  throw new Error(error.message);
                }
              })();
            setShowSuccessMessage(true);
            setShowError(false);
            resetForm();
            console.log('you withdrew' + values.withdrawAmount)
          }}
          >
            
            {({  isValid, dirty }) => (
              <Form>
                Checking Balance:
                 { "$" + balance}
                <br />
                <br />
                <Field
                  className="form-control"
                  name="withdrawAmount"
                  placeholder="Withdraw Checking"
                  type="number"
                  default="0"
                  min="0"
                />
                <br />
                <button
                  type="submit"
                  className="btn btn-outline-primary mr-1 w-100"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </button>
                <br />
                {showError ? (
                  <div
                    style={{
                      color: "red",
                      backgroundColor: "pink",
                      textAlign: "center",
                      borderRadius: 5,
                      fontWeight: "bold",
                      fontSize: "x-small",
                      padding: 10,
                      marginTop: 10,
                    }}
                  >
                    Insufficient funds
                  </div>
                ) : null}
                {showSuccessMessage ? (
                  <div
                    style={{
                      color: "green",
                      backgroundColor: "LightGreen",
                      textAlign: "center",
                      borderRadius: 5,
                      fontWeight: "bold",
                      fontSize: "x-small",
                      padding: 10,
                      marginTop: 10,
                    }}
                  >
                    Withdraw Successful
                  </div>
                ) : null}
              </Form>
            )}
          </Formik>
        }
      />
    </div>
  );
}

export default Withdraw;