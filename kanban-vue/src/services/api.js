import axios from 'axios';

const config = {
  baseURL: 'http://localhost:3333'
}

const api = axios.create(config);

export default api;