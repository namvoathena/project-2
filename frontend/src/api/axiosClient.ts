import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_HOST,
});

export default axiosClient;
