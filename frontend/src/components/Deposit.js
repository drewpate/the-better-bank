import React, { useState } from "react";
import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import MyCard from "./MyCard";

function Deposit() {

  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]);
  const [showSuccessMessage, setShowSuccesMessage] = useState(false);

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

 

  const DepositSchema = Yup.object().shape({
    depositAmount: Yup.number()
      .required("Please enter an amount")
      .positive()
      .integer(),
  });

  // const account = data.map((user, idx) => {
  //   return (
  //     <option key={idx} value={idx}>
  //       {user.name}
  //     </option>
  //   );
  // });



  return (
    <div className="container">
      <MyCard
        className="mx-auto"
        header="Deposit"
        txtcolor="black"
        body={
          <Formik
            initialValues={{
              userPosition: "",
              depositAmount: 0,
            }}
            validationSchema={DepositSchema}
            onSubmit={(values, {resetForm}) => {
              (async () => {
                try {
                    const username = localStorage.getItem('username');
                    fetch("api/users/transactions", {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem('SavedToken')},
                      body: JSON.stringify
                      ({
                          username: `${username}`,
                          checkingBalance: + JSON.parse(`${values.depositAmount}`),
                          savingsBalance: + JSON.parse(`${values.depositAmount}`)
                      })
                    })
                    
                    setBalance(values.depositAmount + data.checkingBalance);
                    setShowSuccesMessage(true);
                  } catch (error) {
                    throw new Error(error.message);
                  }
                })();
              resetForm();
              console.log('you deposited' + values.depositAmount)
            }}
          >
            {({ errors, touched, isValid, dirty, values }) => (
              <Form>
                Account Balance:{" "}
                {"$" + balance}
                <br />
                <Field as="select" name="userPosition" className="form-control">
                  <option key="selectAccount" value="" disabled>
                    Select Account
                  </option>
                  <option>Checking</option>
                  <option>Savings</option>

                  
                </Field>
                {errors.userPosition && touched.userPosition ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "x-small",
                    }}
                  >
                    {errors.userPosition}
                  </div>
                ) : null}
                <br />
                Amount
                <br />
                <Field
                  className="form-control"
                  name="depositAmount"
                  placeholder="Deposit Amount"
                  type="number"
                  default="0"
                  min="0"
                />
                {errors.depositAmount && touched.depositAmount ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginTop: 6,
                      marginBottom: 10,
                      fontSize: "small",
                    }}
                  >
                    {errors.depositAmount}
                  </div>
                ) : null}
                <br />
                <button
                  type="submit"
                  className="btn btn-outline-primary mr-1 w-100"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </button>
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
                    Deposit Sucessful
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

export default Deposit;
