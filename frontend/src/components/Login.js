import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";


import Card from "./Card";
import * as Yup from "yup";


const Login = () => {
  
  const [show, setShow] = useState(true);
  

 
  const loginSchema = Yup.object().shape({
    username: Yup.string()
    .min(6, "Too short")
    .max(20, "Too Long")
    .required("Required"),
    password: Yup.string().min(8, "Too Short").required("Required"),
  });

  let navigate = useNavigate();
  
  const handleLogin = (values)=> {
    
    try {
        fetch("api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: `${values.username}`,
            password: `${values.password}`,
          }),
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          let token = res.token;
          localStorage.setItem('SavedToken', 'Bearer ' + token);
          localStorage.setItem('username', values.username);
      });

        } catch (error) {
          throw new Error("Something went wrong when logging in.")
        }
  }

  return (
    <div>
      <Card
        header="Login"
        body={
          show? (
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
                  handleLogin(values);
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
                  Password
                  <br />
                <Field
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="passord"
                />
                <br/>
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
                <button type="submit" disabled={!(isValid && dirty)} className="btn btn-outline-primary w-100">
                  Submit
                </button>
              </Form>
            )}
          </Formik>) : (<>
            <h5>Login successful!</h5>
              <button
                type="submit"
                className="btn btn-outline-primary mr-1"
                onClick={() => {
                  setShow(true);
                  navigate("/myaccount");
                }}
              >
                Go to my account.
              </button>
          </>)
        }
      />
    </div>
  );
};

export default Login;