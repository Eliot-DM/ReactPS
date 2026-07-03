import "./App.css";
import { Button } from "./components/Button/Button";
import { Header } from "./components/Header/Header";
import { Search } from "./components/Search/Search";
import { useContext } from "react";
import { UserContext } from "./context/user.context";

export const App = () => {
  const { name, setName, saveName } = useContext(UserContext);
  return (
    <>
      <Header />
      <Search
        value={name}
        placeholder={"Ваше имя"}
        svg={false}
        onChange={(e) => setName(e.target.value)}
      />
      <Button big onClick={saveName}>
        Войти в профиль
      </Button>
    </>
  );
};
