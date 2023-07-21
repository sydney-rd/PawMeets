import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/users.js";
import "./SignUp.css";

function SignUp(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const onSignUp = async (data) => {
    try {
      const user = await signUp(data);
      setUser(user);
      console.log(user);
      navigate("/create");
    } catch (error) {
      setError("username", error);
      console.error(error);
    }
  };

  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return <span>{errors[fieldName].message}</span>;
    }
    return null;
  };

  return (
    <div className="signup-container">
      <div className="form-signup">
        <form onSubmit={handleSubmit(onSignUp)}>
          <div className="form-group">
            <input
              required
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Enter email"
            />
            {renderError("email")}
          </div>

          <div className="form-group">
            <input
              required
              type="text"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message:
                    "Username should only contain alphanumeric characters",
                },
                minLength: {
                  value: 5,
                  message: "Username should have a minimum length of 5",
                },
                maxLength: {
                  value: 24,
                  message: "Username should have a maximum length of 24",
                },
              })}
              placeholder="Enter username"
            />
            {renderError("username")}
          </div>

          <div className="form-group">
            <input
              required
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password should have a minimum length of 5",
                },
                maxLength: {
                  value: 24,
                  message: "Password should have a maximum length of 24",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
                  message:
                    "Password should contain at least one uppercase letter, number, and symbol",
                },
              })}
              placeholder="Password"
            />
            {renderError("password")}
          </div>

          <div className="form-group">
            <input
              required
              type="password"
              {...register("passwordConfirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
            {renderError("passwordConfirmation")}
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
