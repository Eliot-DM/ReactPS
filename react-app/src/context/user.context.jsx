import { createContext } from "react";
import { useState, useEffect } from "react";

export const UserContext = createContext({
  user: [],
  name: "",
  currentUser: null,
  setName: () => {},
  saveName: () => {},
  logoutCurrentUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const parsedData = JSON.parse(data);
      setUser(parsedData);
      const loggedUser = parsedData.find((u) => u.isLogined === true);
      setCurrentUser(loggedUser || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(user));
  }, [user]);

  const saveName = () => {
    if (name) {
      const newUser = { name, isLogined: true };
      const updatedUsers = [...user, newUser];
      setUser(updatedUsers);
      setCurrentUser(newUser);
      setName("");
    }
  };

  const logoutCurrentUser = () => {
    if (currentUser) {
      const userIndex = user.findIndex((u) => u.name === currentUser.name);
      if (userIndex !== -1) {
        const updatedUsers = [...user];
        updatedUsers[userIndex].isLogined = false;
        setUser(updatedUsers);
        setCurrentUser(null);
      }
    }
  };

  const value = {
    user,
    name,
    currentUser,
    setName,
    saveName,
    logoutCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
