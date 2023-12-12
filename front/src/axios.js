import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  withCredentials: true,
  headers: {
    'appKey': process.env.REACT_APP_APP_KEY,
    'Content-type': 'application/json',
  },
});

Api.interceptors.response.use((res) => {
  return traitResponse(res.data)
}, (error) => {
  return traitResponse(error.response.data)
})

const traitResponse = ({ data, response }) => {
  if (!response || typeof (response.code) === 'undefined' || typeof (data) == 'undefined') {
    return false
  }

  return { data, response }
}

export default Api;
