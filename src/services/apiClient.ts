import axios from "axios";
const apiClient = axios.create({
  baseURL:
    "https://villas-4262f-default-rtdb.europe-west1.firebasedatabase.app",
});

export default apiClient;
