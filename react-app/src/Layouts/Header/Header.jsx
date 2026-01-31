import styles from "./Header.module.css";

const Header = (user) => {
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
          <li className={styles.menuItem}>
            <a className={styles.menuLink && styles.linkLogin} href="">
              {user ? "Войти" : user}
              <img className={styles.login} src="login.svg" alt="login" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
