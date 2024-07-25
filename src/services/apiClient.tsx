import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://villas-4262f-default-rtdb.europe-west1.firebasedatabase.app",
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
