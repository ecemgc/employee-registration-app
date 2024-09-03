import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    let token = null;

    if (auth) {
      const encryptedToken = JSON.parse(auth).token;
      const bytes = CryptoJS.AES.decrypt(
        encryptedToken,
        import.meta.env.VITE_SECRET_KEY!
      );
      token = bytes.toString(CryptoJS.enc.Utf8);
    }

    if (window.location.pathname === "/login" && !token) {
      return config;
    }

    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("auth");
        window.location.pathname = "/login";
      } else if (error.response.status === 403) {
        toast("You do not have permission to access this resource.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
