import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/users.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Logo/PawMeets-1.png";
import "./SignUp.css";

function SignUp(props) {
  const { user: currentUser, setUser } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      navigate("/homepage");
    }
  }, [currentUser]);

  const onSignUp = async (data) => {
    try {
      const user = await signUp(data);
      setUser(user);
      console.log(user);
      navigate("/create");
    } catch (error) {
      setError(error.field, { type: "custom", message: error.message });
      console.error(error);
    }
  };

  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <span className="signup-error-message">
          {errors[fieldName].message}
        </span>
      );
    }
    return null;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <div className="signup-container">
      <div className="form-signup">
        <div className="signupPmLogo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit(onSignUp)}>
          {/* Email Input and Validation */}
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

          {/* Username Input and Validation */}
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

          {/* Password Input, Validation, Eye Icon */}
          <div className="form-group password-input-container">
            <input
              required
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should have a minimum length of 8",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]+$/,
                  message:
                    "Password should contain at least one uppercase letter, number, and special char.",
                },
              })}
              placeholder="Password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {renderError("password")}

          {/* Confirm Password Input, Validation, Eye Icon */}
          <div className="form-group password-input-container">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              {...register("passwordConfirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
          {renderError("passwordConfirmation")}

          <button className="on-submit-btn" type="submit">
            Sign Up
          </button>
        </form>

        {/* Login Nav Link */}
        <p className="login-nav-link">
          Have an account?
          <a className="login-a-tag" href="/">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
