import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { logoutCurrentUser } from "../../store/user.slice";

export const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorites.favorite,
  );

  const userName = currentUser?.name;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutCurrentUser());
  };

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
              Мои фильмы{" "}
              {favoriteMovies.length > 0 && `(${favoriteMovies.length})`}
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
                <a onClick={handleLogout} className={styles.menuLink} href="/">
                  Выйти
                </a>
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
