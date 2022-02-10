import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import * as Yup from "yup";

const Login = () => {
  let navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Too short")
      .max(20, "Too Long")
      .required("Required"),
    password: Yup.string().min(8, "Too Short").required("Required"),
  });

  return (
    <div>
      <Card
        header="Login"
        body={
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              fetch("users/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: `${values.username}`,
                  password: `${values.password}`,
                }),
              })
                .then((response) => response.json())
                .then((json) => console.log(json));

              navigate("/myaccount");
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
                  autoComplete="username"
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
                <Field
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="passord"
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
                Password
                <br />
                <button type="submit" className="btn btn-outline-primary w-100">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        }
      />
    </div>
  );
};

export default Login;
