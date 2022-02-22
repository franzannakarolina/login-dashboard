import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_API_URL,
});

export const UserApi = () => ({
  validateToken: async (token: string) => {
    const { data } = await api.post("/auth/validateToken", { token });
    return data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
});
