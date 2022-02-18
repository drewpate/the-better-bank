import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import MyCard from "../components/MyCard";

function Withdraw() {
  const [data, setData] = useState([]);
  const [checkingBalance, setCheckingBalance] = useState([]);
  const [savingsBalance, setSavingsBalance] = useState([]);
  const [selectedOption, setSelectedOption] = useState("1");
  const [showError, setShowError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  React.useEffect(() => {
    const username = localStorage.getItem("username");

    try {
      fetch(`api/users/account/${username}`, {
        headers: {
          Authorization: localStorage.getItem("SavedToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } catch (err) {
      throw new Error(err.message);
    }
    setCheckingBalance(data.checkingBalance);
    setSavingsBalance(data.savingsBalance);
  }, [data.checkingBalance, data.savingsBalance]);

  const WithdrawSchema = Yup.object().shape({
    withdrawAmount: Yup.number("Please enter a number")
      .min(1)
      .required("Required")
      .positive()
      .integer(),
  });

  function handleUpdate(values, accountType) {
    const account =
      accountType === "1"
        ? { checkingBalance: -values.withdrawAmount, savingsBalance: 0 }
        : { checkingBalance: 0, savingsBalance: -values.withdrawAmount };
    try {
      const username = localStorage.getItem("username");
      fetch("api/users/transactions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("SavedToken"),
        },
        body: JSON.stringify({
          username,
          ...account,
        }),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

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
            onSubmit={(values, { resetForm }) => {
              if (selectedOption === "1") {
                if (checkingBalance < values.withdrawAmount) {
                  setShowError(true);
                } else {
                  handleUpdate(values, selectedOption);
                  setCheckingBalance(checkingBalance - values.withdrawAmount);
                  console.log("you withdrew" + values.withdrawAmount);
                  setShowSuccessMessage(true);
                  resetForm();
                }
              } else {
                if (savingsBalance < values.withdrawAmount) {
                  setShowError(true);
                } else {
                  handleUpdate(values, selectedOption);
                  setSavingsBalance(savingsBalance - values.withdrawAmount);
                  console.log("you withdrew" + values.withdrawAmount);
                  setShowSuccessMessage(true);
                  resetForm();
                }
              }
            }}
          >
            {({ isValid, dirty }) => (
              <Form>
                <label htmlFor="Choose-Account">Choose Account:</label>
                <br />
                <br />
                <Field
                  as="select"
                  className="form-control"
                  id="ChooseAccount"
                  name="ChooseAccount"
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                >
                  <option value="1">Checking</option>
                  <option value="2">Savings</option>
                </Field>
                <br />
                {selectedOption === "1" ? (
                  <p>{"Balance $" + checkingBalance}</p>
                ) : (
                  <p>{"Balance $" + savingsBalance}</p>
                )}
                {selectedOption === "1" && (
                  <Field
                    className="form-control"
                    name="withdrawAmount"
                    id="withdrawAmount"
                    placeholder="Withdraw Checking"
                    type="number"
                    default="0"
                    min="0"
                  />
                )}
                {selectedOption === "2" && (
                  <Field
                    className="form-control"
                    name="withdrawAmount"
                    id="withdrawAmount"
                    placeholder="Withdraw Savings"
                    type="number"
                    default="0"
                    min="0"
                  />
                )}
                <br />
                <br />
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
