import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/users.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
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

  return (
    <div className="form-signin">
   <div className="pmLogo">
  <img src={logo} alt="Logo" />
</div>
      <form onSubmit={handleSubmit(onLogin)}>
        {/* Removed the <label> element */}
        <input
          required
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
          placeholder="Enter Username"
        />
        {errors.username && <p>{errors.username.message}</p>}
        <input
          required
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        {loginError && <p>{loginError}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Need an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
