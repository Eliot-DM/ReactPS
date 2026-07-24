import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import { Search } from "../../components/Search/Search";
import styles from "./Body.module.css";
import { RootState } from "../../store/store";
import { setName, saveName } from "../../store/user.slice";

export const Login = () => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.name);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleSaveName = () => {
    dispatch(saveName());
  };

  return (
    <>
      {currentUser ? (
        <div>
          <h2>Добро пожаловать, {currentUser.name}!</h2>
        </div>
      ) : (
        <>
          <h2>Login</h2>
          <Search
            value={name}
            placeholder={"Ваше имя"}
            svg={false}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          <Button big onClick={handleSaveName}>
            Войти в профиль
          </Button>
        </>
      )}
    </>
  );
};

export default Login;
