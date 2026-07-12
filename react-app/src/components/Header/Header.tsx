import styles from "./Header.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Link } from "react-router-dom";

export const Header = () => {
  const { currentUser, logoutCurrentUser } = useContext(UserContext);

  const userName = currentUser?.name;

  return (
    <div className={styles.header}>
      <img className={styles.logo} src="/public/svg/logo.svg" alt="logo" />
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} to="/">
              Поиск фильмов
            </Link>
            {/* <a className={styles.menuLink} href="">
              Поиск фильмов
            </a> */}
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} to="/favorites">
              Мои фильмы
            </Link>
            {/* <a className={styles.menuLink} href="">
              Мои фильмы
            </a> */}
          </li>

          {userName ? (
            <>
              <li className={styles.menuItem}>
                <Link
                  className={`${styles.menuLink} ${styles.linkLogin}`}
                  to="/login"
                >
                  {userName}
                  <img
                    className={styles.login}
                    src="/public/svg/login.svg"
                    alt="login"
                  />
                </Link>

                {/* <a className={`${styles.menuLink} ${styles.linkLogin}`} href="">
                  {userName}
                  <img
                    className={styles.login}
                    src="/public/svg/login.svg"
                    alt="login"
                  />
                </a> */}
              </li>
              <li className={styles.menuItem}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    logoutCurrentUser();
                  }}
                  className={styles.menuLink}
                  to="/"
                >
                  Выйти
                </Link>

                {/* <a
                  className={styles.menuLink}
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    logoutCurrentUser();
                  }}
                >
                  Выйти
                </a> */}
              </li>
            </>
          ) : (
            <li className={styles.menuItem}>
              <Link
                className={`${styles.menuLink} ${styles.linkLogin}`}
                to="/login"
              >
                Войти
                <img className={styles.login} src="login.svg" alt="login" />
              </Link>

              {/* <a className={`${styles.menuLink} ${styles.linkLogin}`} href="">
                Войти
                <img className={styles.login} src="login.svg" alt="login" />
              </a> */}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
