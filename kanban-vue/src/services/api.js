import axios from 'axios';

const config = {
  baseURL: 'http://192.168.0.128:3333'
}

const api = axios.create(config);

export default api;