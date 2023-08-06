import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../services/users.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Logo/PawMeets-1.png";
import "./Login.css";
import { getUserDogs } from "../../services/dogs.js";

function Login(props) {
  const { user: currentUser, setUser, setCurrentDog } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/homepage");
    }
  }, [currentUser]);

  const onLogin = async (data) => {
    try {
      const user = await login(data);
      setUser(user);
      console.log("user: ", user);

      const dogs = await getUserDogs();

      if (dogs?.length > 0) {
        setCurrentDog(dogs[0]);
        localStorage.setItem("currentProfile", JSON.stringify(dogs[0]));
      }
      navigate("/homepage");
    } catch (error) {
      setError(error.field, { type: "custom", message: error.message });
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <div className="form-login">
        <div className="loginPmLogo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit(onLogin)}>
          <input
            required
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter Username"
          />
          {errors.username && (
            <p className="login-error-message">{errors.username.message}</p>
          )}
          <div className="password-input-container">
            <input
              required
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter Password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.password && (
            <p className="login-error-message">{errors.password.message}</p>
          )}
          <button type="submit">Login</button>
        </form>
        <p className="signup-nav-link">
          Need an account?
          <a className="signup-a-tag" href="/signup">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
