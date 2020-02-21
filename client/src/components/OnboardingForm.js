import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, Formik, yupToFormErrors } from "formik";
import * as yup from "yup";

function OnboardingForm({ values, errors, touched }) {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("okay????????"),
    password: yup.string().required("okay????????")
  });

  return (
    <div className="loginForm">
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          checkbox: false
        }}
        onSubmit={(values, tools) => {
          tools.resetForm();
          alert`${values.name} ${values.age}`;
        }}
        render={props => {
          return (
            <Form>
              Username:
              <input type="text" name="username" placeholder="Username" />
              Password:
              <input type="text" name="password" placeholder="Password" />
              Email:
              <input type="text" name="email" placeholder="Email" />
              <Field type="checkbox" name="tos" />
              Accept TOS
              <button>Submit!</button>
            </Form>
          );
        }}
        validationSchema={validationSchema}
      />
    </div>
  );
}

export default OnboardingForm;
