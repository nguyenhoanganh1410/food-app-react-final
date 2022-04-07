// api/axiosClient.js
//cart
//comment
//wishlist
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const axiosClientNew = axios.create({
   // baseURL: process.env.REACT_APP_API_URL,
    baseURL: 'https://foodapp-api-json.herokuapp.com/api',
    headers: {
    'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClientNew.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
})

axiosClientNew.interceptors.response.use((response) => {
  if (response && response.data) {
  return response.data;
  }
  return response;
  }, (error) => {
  // Handle errors
  throw error;
});


export default axiosClientNew;