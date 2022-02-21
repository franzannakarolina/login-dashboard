import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_API_URL,
});

export const UserApi = () => ({
  validateToken: async (token: string) => {
    return {
      user: { id: 3, name: "John Doe", email: "john@email.com" },
    };
    const { data } = await api.post("/auth/validateToken", { token });
    return data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post("/auth/signin", { email, password });
    return {
      user: { id: 3, name: "John Doe", email: "john@email.com" },
      token: "123456789",
    };
    return response.data;
  },
  logout: async () => {
    return { status: true };
    // const response = await api.post("/auth/logout");
    // return response.data;
  },
});