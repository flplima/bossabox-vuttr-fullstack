import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((req) => {
  const { token } = localStorage;
  req.headers.Authorization = token && `Bearer ${token}`;
  return req;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.reload();
      return;
    }
    return Promise.reject(error);
  }
);

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

export default api;
