import axios from "axios";
import { toast } from "react-toastify";
import { appConfig } from "../config";

const axiosApi = axios.create({
  baseURL: appConfig.API_URL,
});

// Add a request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    // set header with access token if not available
    if (!config.headers["authorization"]) {
      const token = localStorage.getItem("_token");
      config.headers["authorization"] = token ? `Bearer ${token}` : "";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// setting up interceptors
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 404) {
      console.log(" ERROR => 404 => API not available");
    } else if (error?.response?.status === 500) {
      console.log(" ERROR => 500 => Server Error");
      toast.error(error?.response?.data?.responseText);
    } else if (error?.response?.status === 422) {
      console.log(" ERROR => 422 => Validation Error");
      toast.error(error?.response?.data?.responseText);
    } else if (error?.response?.status === 500) {
      console.log(" ERROR => 500 => Server Error");
      toast.error(error?.response?.data?.responseText);
    } else if (error?.response?.status === 401) {
      console.log(" ERROR => 401 => User is not authorized");
      if (localStorage.getItem("_token")) {
        localStorage.removeItem("_token");
        window.location("/");
      }
    } else {
      console.log("/other-errors.");
    }
    return Promise.reject(error);
  }
);

export { axiosApi };
