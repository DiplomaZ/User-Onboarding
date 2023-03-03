import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withFormik,
  Form,
  Field,
  Formik,
  yupToFormErrors,
  ErrorMessage
} from "formik";
import * as yup from "yup";

function OnboardingForm({ values, errors, touched }) {
  return (
    <div className="loginForm">
      <Form>
        Username:
        <Field type="text" name="username" placeholder="Username" />
        <ErrorMessage name="username" component="div" className="red" />
        Password:
        <Field type="text" name="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" className="red" />
        Email:
        <Field type="text" name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" className="red" />
        <Field type="checkbox" name="tos" />
        Accept TOS
        <input type="submit" />
      </Form>
    </div>
  );
}

const FormikOnboardingForm = props => {
  const WithFormikFormatter = withFormik({
    mapPropsToValues({ name, password, email, tos }) {
      return {
        name: name || "",
        password: password || "",
        email: email || "",
        tos: tos || ""
      };
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(8, "Username must be 8 characters or more")
        .required("Username is required"),
      email: yup
        .string()
        .email("Email not valid")
        .required("Email is required"),
      password: yup
        .string()
        .min(12, "Password must be 12 characters or longer")
        .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      if (values.email === "set this up for duplicates later") {
        setErrors({ email: "That email is already taken" });
      } else {
        axios
          .post("https://reqres.in/api/users", values)
          .then(res => {
            console.log(res); // Data was created successfully and logs to console
            props.addUser(res.data);
            resetForm();
            setSubmitting(false);
          })
          .catch(err => {
            console.log(err); // There was an error creating the data and logs to console
            setSubmitting(false);
          });
      }
    }
  })(OnboardingForm);
  return <WithFormikFormatter />;
};

export default FormikOnboardingForm;
