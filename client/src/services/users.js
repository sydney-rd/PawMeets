import api from "./apiConfig";
import jwtDecode from "jwt-decode";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/auth/signup", credentials);

    localStorage.setItem("token", resp.data.token);
    const user = jwtDecode(resp.data.token);
    return user;
  } catch (error) {
    if (error.response) {
      const customError = new Error(error.response.data.message);
      customError.field = error.response.data.field;
      throw customError;
    }

    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const resp = await api.post("/auth/", credentials);
    localStorage.setItem("token", resp.data.token);
    const user = jwtDecode(resp.data.token);
    return user;
  } catch (error) {
    if (error.response) {
      const customError = new Error(error.response.data.message);
      customError.field = error.response.data.field;
      throw customError;
    }
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await api.get("/auth/verify");
    return res.data;
  }
  return false;
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("currentProfile");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userLikedDogIds");
  } catch (error) {
    throw error;
  }
};
