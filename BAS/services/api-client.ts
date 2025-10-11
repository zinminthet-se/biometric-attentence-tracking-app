import axios from "axios";

export default axios.create({
  baseURL: "http://10.244.43.244:8080/api",
});
