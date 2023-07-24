import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/users.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

function Login(props) {
  const { setUser } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async (data) => {
    try {
      const user = await signIn(data);
      setUser(user);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid username or password");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  return (
    <div className="login-container">
      <div className="form-login">
        <div className="pmLogo">{/* <img src={logo} alt="Logo" /> */}</div>
        <form onSubmit={handleSubmit(onLogin)}>
          <input
            required
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter Username"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <input
            required
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter Password"
          />
          <div className="password-toggle-btn-container">
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
              </div>
          {errors.password && <p>{errors.password.message}</p>}
          {loginError && <p>{loginError}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="signup-nav-link">
          Need an account? <a className="signup-a-tag" href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
