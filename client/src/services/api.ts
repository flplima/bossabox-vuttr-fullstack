import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { Accept: "application/json" },
});

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

export default api;
