import { useSelector } from "react-redux";
import { CardList } from "../../components/CardList/CardList";
import { RootState } from "../../store/store";
import styles from "./Favorites.module.css";

export const Favorites = () => {
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorites.favorite,
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Избранное {favoriteMovies.length > 0 && `(${favoriteMovies.length})`}
      </h2>

      {favoriteMovies.length === 0 ? (
        <p className={styles.empty}>У вас пока нет избранных фильмов</p>
      ) : (
        <CardList data={favoriteMovies} />
      )}
    </div>
  );
};

export default Favorites;
