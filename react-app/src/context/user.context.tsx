import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  isLogined: boolean;
}

interface UserContextType {
  user: User[];
  name: string;
  currentUser: User | null;
  setName: (value: string) => void;
  saveName: () => void;
  logoutCurrentUser: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

// Создаем контекст с правильным типом
export const UserContext = createContext<UserContextType>({
  user: [],
  name: "",
  currentUser: null,
  setName: () => {},
  saveName: () => {},
  logoutCurrentUser: () => {},
});

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      try {
        const parsedData: User[] = JSON.parse(data);
        setUser(parsedData);
        const loggedUser = parsedData.find((u) => u.isLogined === true);
        setCurrentUser(loggedUser || null);
        navigate("/");
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(user));
  }, [user]);

  const saveName = (): void => {
    if (name.trim()) {
      const newUser: User = {
        name: name.trim(),
        isLogined: true,
      };
      const updatedUsers = [...user, newUser];
      setUser(updatedUsers);
      setCurrentUser(newUser);
      setName("");
    }
  };

  const logoutCurrentUser = (): void => {
    if (currentUser) {
      const userIndex = user.findIndex((u) => u.name === currentUser.name);
      if (userIndex !== -1) {
        const updatedUsers = [...user];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isLogined: false,
        };
        setUser(updatedUsers);
        setCurrentUser(null);
      }
    }
  };

  const value: UserContextType = {
    user,
    name,
    currentUser,
    setName,
    saveName,
    logoutCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
