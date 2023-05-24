import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/users.js";
import './SignUp.css';

function SignUp(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSignUp = async (data) => {
    try {
      const user = await signUp(data);
      setUser(user);
      console.log(user);
      navigate("/create");
    } catch (error) {
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
    <>
      <div className="form-signup">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit(onSignUp)}>
          <label>Email</label>
          <input 
            required
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter email"
          />
          {renderError("email")}

          <label>Username</label>
          <input
            required
            type="text"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Username should only contain alphanumeric characters",
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

          <label>Password</label>
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
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
                message: "Password should contain at least one uppercase letter, number, and symbol",
              },
            })}
            placeholder="Password"
          />
          {renderError("password")}

          <label>Password Confirmation</label>
          <input
            required
            type="password"
            {...register("passwordConfirmation", {
              required: "Password confirmation is required",
              validate: (value) => value === getValues("password") || "Passwords do not match",
            })}
            placeholder="Confirm Password"
          />
          {renderError("passwordConfirmation")}

          <button type="submit">Sign Up</button>
        </form>
        <p>Have an account? <a href="/login">Login</a></p>
      </div>
    </>
  );
}

export default SignUp;
