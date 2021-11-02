import axios from "axios";

const api = axios.create({
  baseURL: "localhost:9000",
});

export default api;
