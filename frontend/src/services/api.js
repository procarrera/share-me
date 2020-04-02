import axios from "axios";

const api = axios.create({
  baseURL: "https://frida.now.sh/"
});

export default api;