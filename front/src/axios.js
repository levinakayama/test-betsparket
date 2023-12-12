import axios from 'axios';
import { toast } from 'react-toastify';

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
  traitResponse(error.response.data)
})

const traitResponse = ({ data, response }) => {
  if (!response || typeof (response.code) === 'undefined' || typeof (data) == 'undefined') {
    toast.error('Ocorreu um erro ao conectar ao servidor.')
    return false
  }

  if (response.code !== 0) {
    toast.error(response.msg ?? null)
  }

  switch (response.code) {
    case 1:
      return false
    default:
      return data
  }
}

export default Api;
