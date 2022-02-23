import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5001/api/User',
});
export default api;
