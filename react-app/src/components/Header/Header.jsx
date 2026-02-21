import styles from "./Header.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const Header = ({ onClick }) => {
  const { name } = useContext(UserContext);
  console.log(name);

  return (
    <div className={styles.header}>
      <img className={styles.logo} src="/public/svg/logo.svg" alt="logo" />
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="">
              Поиск фильмов
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="">
              Мои фильмы
            </a>
          </li>
          {name ? (
            <>
              <li className={styles.menuItem}>
                <a className={styles.menuLink && styles.linkLogin} href="">
                  {name}
                  <img
                    className={styles.login}
                    src="/public/svg/login.svg"
                    alt="login"
                  />
                </a>
              </li>
              <li className={styles.menuItem}>
                <a className={styles.menuLink} href="" onClick={onClick}>
                  Выйти
                </a>
              </li>
            </>
          ) : (
            <li className={styles.menuItem}>
              <a className={styles.menuLink && styles.linkLogin} href="">
                Войти
                <img className={styles.login} src="login.svg" alt="login" />
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
