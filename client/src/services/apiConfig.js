import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    resolve(`Bearer ${localStorage.getItem("token") || null}`);
  });
};

const api = axios.create({
  baseURL:
    // process.env.NODE_ENV === "production"
    //   ? "https://pawmeets-production.up.railway.app"
    //   : "http://127.0.0.1:3000",
    "https://pawmeets-production.up.railway.app"
});

api.interceptors.request.use(
  async function (config) {
    config.headers["Authorization"] = await getToken();
    return config;
  },
  function (error) {
    console.log("Request error: ", error);
    return Promise.reject(error);
  }
);

export default api;