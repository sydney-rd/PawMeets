import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/users.js";
import './SignUp.css'

function SignUp(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) =>
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

  const onSignUp = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp(form);
      setUser(user);
      console.log(user)
      navigate("/create");
    } catch (error) {
      console.error(error);
      setForm({
        username: "",
        password: "",
        passwordConfirmation: "",
        isError: true,
        errorMsg: "Sign Up Details Invalid",
      })
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
      return <button type="submit">Sign Up</button>;
    }
  };

  const { username, password, passwordConfirmation } = form;

  console.log(form)

  return (
    <>
      <div className="form-signup">
        <h3>Sign Up</h3>
        <form onSubmit={onSignUp}>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <label>Password Confirmation</label>
          <input
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {renderError()}
        </form>
        <p>Have an account <a href="/">Sign in</a></p>
      </div>
    </>
  );
}

export default SignUp;
