import { useContext } from "react";
import { Button } from "../../components/Button/Button";
import { Search } from "../../components/Search/Search";
import styles from "./Body.module.css";
import { UserContext } from "../../context/user.context";

export const Login = () => {
  const { name, setName, saveName } = useContext(UserContext);
  return (
    <>
      Login
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

export default Login;
