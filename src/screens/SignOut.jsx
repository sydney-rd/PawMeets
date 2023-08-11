import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/users.js";

export default function SignOut({ setUser, setCurrentDog }) {
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      await signOut();
      setCurrentDog(null);
      setUser(null);
      navigate("/");
    };
    signOutUser();
  }, [setUser, navigate]);

  return "";
}
