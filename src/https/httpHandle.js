import axios from "axios";

const https = axios.create();

// Add a request interceptor
https.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers = {
    "access-control-allow-origin": "*",
    "Content-type": config.headers["Content-Type"] ? config.headers["Content-Type"] : "application/json; charset=UTF-8",
    "Authorization": token ? `Bearer ${token}` : null,
  }
  // if (config.headers["responseType"]) {
  //   config.responseType = config.headers["responseType"];
  // }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
https.interceptors.response.use(function (response) {
  return response.data;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log(error, error.response)
  if (error?.response && error.response?.status === 401) {
    // Do something if the status is 401 Unauthorized
    console.log('Unauthorized request');
  } else if (error?.response && error.response?.status === 404) {
    // Do something if the status is 404 Not Found
    console.log('Resource not found');
  } else {
    // Handle other errors
  }
  return Promise.reject(error);
});

export default https;