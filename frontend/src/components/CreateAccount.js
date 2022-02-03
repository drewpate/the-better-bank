import React from "react";
import { Formik, Form, Field } from "formik";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  let navigate = useNavigate();

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Too short")
      .max(50, "Too long")
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().min(8, "Too shoort").required("Required"),
  });

  return (
    <div className="container">
      <Card
        className="mx-auto"
        header="Create Account"
        txtcolor="black"
        body={
          show ? (
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              validationSchema={formSchema}
              onSubmit={(values, { resetForm }) => {
                (async () => {
                  try {
                    await fetch(
                      `/account/create/${values.username}/${values.email}/${values.password}`,
                      { method: "POST" }
                    )
                      .then((response) => response.text())
                      .then((data) => {
                        console.log(data);
                      });
                  } catch (err) {
                    console.log(err);
                    throw new Error(err.message);
                  }
                })();
                resetForm();
                // setShow(false);
              }}
            >
              {({ errors, touched, isValid, dirty }) => (
                <Form>
                  Username
                  <br />
                  <Field
                    className="form-control"
                    name="username"
                    placeholder="Enter username"
                    autoComplete="new-username"
                  />
                  {errors.name && touched.name ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.name}
                    </div>
                  ) : null}
                  <br />
                  Email address
                  <br />
                  <Field
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="new-username"
                  />
                  {errors.email && touched.email ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.email}
                    </div>
                  ) : null}
                  <br />
                  Password
                  <br />
                  <Field
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.password && touched.password ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.password}
                    </div>
                  ) : null}
                  <br />
                  <button
                    type="submit"
                    className="btn btn-outline-primary w-100"
                    disabled={!(isValid && dirty)}
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-outline-primary mt-1 w-100"
                  >
                    Clear
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <h5>Acount successfully created!</h5>
              <button
                type="submit"
                className="btn btn-outline-primary mr-1"
                onClick={() => {
                  setShow(true);
                  navigate("/login");
                }}
              >
                Go to login page.
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default CreateAccount;
