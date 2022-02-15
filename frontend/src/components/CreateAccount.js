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
      .max(20, "Too long")
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().min(8, "Too short").required("Required"),
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
                  // Similar recommendations to the deposit code.
                  // 1. Switch to either async/await or promise.then for handling the response (promise then works best imho)
                  // 2. Move the code into a function outside of the JSX
                  // 3. You may want to implement a library that's easier to use than raw fetch (like `ky`)
                  // 4. Not sure about the try / catch. I think it's for the await actually so it is probably not really necessary if you switch to using only promise.then
                  try {
                    await fetch("api/users", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: `${values.username}`,
                        email: `${values.email}`,
                        password: `${values.password}`,
                      }),
                    })
                      .then((response) => response.json())
                      .then((json) => {
                        console.log(json);
                      });
                  } catch (err) {
                    console.log(err);
                    throw new Error(err.message);
                  }
                })();
                resetForm();
                setShow(false);
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
                  {errors.username && touched.username ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.username}
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
                    disabled={ !isValid } /* I think this may be needed */
                    className="btn btn-outline-primary w-100"
                  >
                    Submit
                  </button>
                  <br/>
                  <br/>
                  <button
                    type="reset"
                    className="btn btn-outline-primary mt-1 w-100"
                  >
                    Clear
                  </button>
                  <br />
                  <br />
                  Already have an account? { /** Minor spelling mistake */}
                  <br/>
                  <a href="/login" style={{color: "blue"}}>Login</a>
                </Form>
              )}
            </Formik>
          ) : (
            <>
                <h5>Account successfully created!</h5> { /** Minor spelling mistake */}
              <button
                  type="submit"
                className="btn btn-outline-primary mr-1"
                onClick={() => {
                  setShow(true); // Since you're navigating away this state update won't do anything useful
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