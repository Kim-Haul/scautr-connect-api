import axios from 'axios';
import { getCookie } from './cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,

  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

api.interceptors.request.use((config: any) => {
  const accessToken = getCookie('Authorization');
  config.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

const apis = {};
export default apis;
