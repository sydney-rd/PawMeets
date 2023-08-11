import api from "./apiConfig";
import jwtDecode from "jwt-decode";

const handleAuthCalls = async (apiEndpoint, credentials) => {
  try {
    const resp = await api.post(apiEndpoint, credentials);
    localStorage.setItem("token", resp.data.token);
    return jwtDecode(resp.data.token);
  } catch (error) {
    if (error.response) {
      const customError = new Error(error.response.data.message);
      customError.field = error.response.data.field;
      throw customError;
    }
  }
};

export const signUp = async (credentials) => {
  return handleAuthCalls("/auth/signup", credentials);
};

export const login = async (credentials) => {
  return handleAuthCalls("/auth/", credentials);
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
