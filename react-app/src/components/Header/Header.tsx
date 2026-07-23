import styles from "./Header.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const { currentUser, logoutCurrentUser } = useContext(UserContext);

  const userName = currentUser?.name;

  return (
    <div className={styles.header}>
      <img className={styles.logo} src="/public/svg/logo.svg" alt="logo" />
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink className={styles.menuLink} to="/">
              Поиск фильмов
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink className={styles.menuLink} to="/favorites">
              Мои фильмы
            </NavLink>
          </li>
          {userName ? (
            <>
              <li className={styles.menuItem}>
                <NavLink
                  className={`${styles.menuLink} ${styles.linkLogin}`}
                  to="/login"
                >
                  {userName}
                  <img
                    className={styles.login}
                    src="/public/svg/login.svg"
                    alt="login"
                  />
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    logoutCurrentUser();
                  }}
                  className={styles.menuLink}
                  to="/"
                >
                  Выйти
                </NavLink>
              </li>
            </>
          ) : (
            <li className={styles.menuItem}>
              <NavLink
                className={`${styles.menuLink} ${styles.linkLogin}`}
                to="/login"
              >
                Войти
                <img className={styles.login} src="login.svg" alt="login" />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
