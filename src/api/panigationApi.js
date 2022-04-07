import axiosClient from './axiosClient'
// api/productApi.js
const panigationApi  = {
  getAll : () => {
    const URL = "/pagination";
    return axiosClient.get(URL);
  },
}

export default panigationApi;