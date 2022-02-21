// Provider ele vai usar o contexto para criar um grupo em volta da minha aplicação e assim eu terei acesso dentro da aplicação de todos os dados

import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

import { UserApi } from "../../hooks";
import { User } from "../../types";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = UserApi();

  //obs.: sei que não pode usar async dentro do useEffect, mais nesse caso eu criei uma função e uso dentro dessa função
  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    };
    validateToken();
  }, [api]);

  const signin = async (email: string, password: string) => {
    // retornar uma promise
    const data = await api.signin(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const signout = async () => {
    await api.logout();
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
