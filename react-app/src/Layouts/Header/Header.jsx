import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src="/public/svg/logo.svg" alt="logo" />
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-item">
            <a className="menu-link" href="">
              Поиск фильмов
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              Мои фильмы
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link link-login" href="">
              Войти
              <img className="login" src="login.svg" alt="login" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
