import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/favorites.slice"; // Импортируем action

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
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      try {
        const parsedData: User[] = JSON.parse(data);
        setUser(parsedData);
        const loggedUser = parsedData.find((u) => u.isLogined === true);
        setCurrentUserState(loggedUser || null);

        // Синхронизируем пользователя с Redux store
        dispatch(setCurrentUser(loggedUser ? loggedUser.name : null));

        if (loggedUser) {
          navigate("/");
        }
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
      setCurrentUserState(newUser);

      // Синхронизируем пользователя с Redux store
      dispatch(setCurrentUser(newUser.name));

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
        setCurrentUserState(null);

        // Очищаем данные пользователя в Redux store
        dispatch(setCurrentUser(null));
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
