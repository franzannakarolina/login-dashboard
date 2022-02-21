import { createContext } from "react";
import { User } from "../../types";


export type AuthContextType = {
  //acesso dos dados que está logado
  user: User | null;
  //função para logar, login tem que retorna true ou false
  signin: (email: string, password: string) => Promise<boolean>;
  //função para deslogar
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!)