import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { v4 } from "uuid";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  //register
  const register = async (name: string, email: string, password: string) => {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("ثبت نام ناموفق بود");
    const newUser = await res.json();
    const newToken = v4();

    setUser(newUser);
    setToken(newToken);

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newToken);
  };

  // login

  const login = async (email: string, password: string) => {
    const res = await fetch(
      `http://localhost:4000/users?email=${email}&password=${password}`
    );
    const data = await res.json();

    if (data.length === 0) throw new Error("ایمیل یا رمز اشتباه است");

    const loggedUser = data[0];
    const newToken = v4();

    setUser(loggedUser);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", newToken);
  };

  //logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,

        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  }
  return context;
};
