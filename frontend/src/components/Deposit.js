import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Card from "./Card";

function Deposit() {

  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]); // I think this might be a Number rather than an array. Might make sense to use zero rather than an empty array.
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Minor spelling error

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
      <Card
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
            onSubmit={ (values, { resetForm }) => {
              // Strongly recommend making this into a function on its own since it's massive. Always good to separate large functional code from the JSX imho.
              (async () => { // No need to `async` unless there is an await I think
                try {
                  const username = localStorage.getItem('username');
                  // TODO: Validate the username isn't null before sending to the backend. Just in case local storage has changed.
                    fetch("api/users/transactions", {
                      method: "PUT", // Good method, but PATCH might be more appropriate as there is no need to update the user's username on each request. (PATCH is a partial update)
                      headers: {
                        "Content-Type": "application/json", // Thumbs up, this is more convenient with https://github.com/sindresorhus/ky
                        Authorization: localStorage.getItem('SavedToken')}, // Might want to validate this token exists
                      body: JSON.stringify // Again it's a lot easier with https://github.com/sindresorhus/ky or another fetch wrapper
                      ({
                          username, // This works, not sure if there is a pattern to follow but usually I do `username || ''` or validate the username beforehand
                          checkingBalance: values.depositAmount, // No need to JSON.parse since we know these are numbers and JSON supports numbers. Also I think the `+` probably isn't necessary
                          savingsBalance: values.depositAmount
                      })
                    })
                  // Important: Since there is no await on the fetch, we don't know at this time if the transaction was successful. The UI updates prematurely which can cause bad UX.
                  // Strongly recommend returning new balances from the backend and using .then(res => {...}) to handle UI updates. The single source of truth is always the backend and DB, not the frontend.
                    setBalance(values.depositAmount + data.checkingBalance);
                    setShowSuccessMessage(true);
                } catch (error) {
                  // I'm not sure off-hand if anything in the try will actually throw an uncaught exception...
                    throw new Error(error.message);
                  }
                })();
              resetForm(); // Would recommend moving these lines into a `then` or `finally` statement, we don't have a guarantee that the update was successful without the backend confirming it.
              console.log('you deposited' + values.depositAmount)
            }}
          >
            {({ errors, handleChange, touched, isValid, dirty, values }) => (
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
                  // You may want to implement https://github.com/HudsonGraeme/xPro-Portfolio/blob/main/capstone/src/components/TransactionPage.jsx
                  // value={ values.depositAmount }
                  // onChange={handleChange}
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
                    Deposit Successful { /* Minor spelling error */}
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
