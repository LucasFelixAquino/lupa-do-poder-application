import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-dot-swift-climate-328915.rj.r.appspot.com/',
});

export default api;
