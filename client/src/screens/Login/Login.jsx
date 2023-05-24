import React from "react";
import { useState } from "react";
import { signIn } from "../../services/users.js";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login(props) {
  const { setUser } = props;
  const [form, setForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const navigate = useNavigate();

  // Function designed to redirect to targeted user
  const handleUser = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(form);
      setUser(user);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      setForm({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: "",
        password: "",
      });
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";
    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Sign In</button>;
    }
  };

  const { username, password } = form;

  return (
    <>
    <div className="form-signin">
      <h3>Sign In</h3>
      <form onSubmit={onSignIn}>
        <label>Username</label>
        <input
          required
          type="text"
          name="username"
          value={username}
          placeholder="Enter Username"
          onChange={handleUser}
        />
        <label>Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={handleUser}
        />
        {renderError()}
      </form>
      <p>Need an account? <a href="/signup">Sign up</a></p>
 </div>
 </>
  );
}
export default Login;
