import React from "react";
import { useState } from "react";
import { signIn } from "../../services/users.js";
import { useNavigate } from "react-router-dom";

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

  const validateForm = () => {
    const { username, password } = form;

    if (username.includes("-")) {
      setForm({
        ...form,
        isError: true,
        errorMsg: "Username must not contain dashes",
      });
      return false;
    }

    if (username.length <= 5) {
      setForm({
        ...form,
        isError: true,
        errorMsg: "Username must be over 5 characters",
      });
      return false;
    }

    if (password.length < 6 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setForm({
        ...form,
        isError: true,
        errorMsg: "Password must be at least 6 characters long and include a symbol and a number",
      });
      return false;
    }

    return true;
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
    }
  };

  const renderError = () => {
    if (form.isError) {
      return <p className="text-red-500">{form.errorMsg}</p>;
    }
    return null;
  };

  const { username, password } = form;

  return (
    <>
      <div className="w-64 h-76 bg-white rounded-lg shadow-md flex flex-col">
        <form onSubmit={onLogin} className="space-y-4">
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleUser}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleUser}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col space-y-2 bg-blue">
            {renderError()}
            <button type="submit">Log In</button>
          </div>
          <p className="mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
