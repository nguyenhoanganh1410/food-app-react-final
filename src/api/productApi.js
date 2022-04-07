
import axiosClient from './axiosClient'
// api/productApi.js
const productApi  = {
  getAll : (url,params) => {
    const URL = `/${url}`;
    return axiosClient.get(URL, { params });
  }
 
 
}

export default productApi;