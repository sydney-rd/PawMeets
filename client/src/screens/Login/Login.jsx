import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/users.js";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login(props) {
  const { setUser } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onSignIn = async (data) => {
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
    <>
      <div className="form-signin">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSignIn)}>
          <label>Username</label>
          <input
            required
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter Username"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <label>Password</label>
          <input
            required
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          {loginError && <p>{loginError}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Need an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </>
  );
}

export default Login;
