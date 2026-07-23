import {
  addFavorite,
  deleteFavorite,
  Movie,
} from "../../store/favorites.slice";
import styles from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"; // импортируем тип

interface CardProps {
  title: string;
  src: string;
  star: string;
}

export const Card = ({ title, src, star }: CardProps) => {
  const dispatch = useDispatch();
  // Заменяем any на RootState
  const favorites = useSelector((state: RootState) => state.favorites.favorite);

  const isFavorite = favorites.some((movie: Movie) => movie.title === title);

  const handleToggleFavorite = () => {
    const movie: Movie = { title, src, star };

    if (isFavorite) {
      dispatch(deleteFavorite(title));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <li className={styles.card}>
      <div className={styles.star}>
        <img className={styles.star_svg} src="/public/svg/star.svg" alt="" />
        <p className={styles.star_text}>{star}</p>
      </div>
      <img className={styles.img} src={src} alt={title} />
      <p className={styles.card_title}>{title}</p>

      <div
        className={styles.block_link}
        onClick={handleToggleFavorite}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
      >
        <img
          className={styles.like_svg}
          src={
            isFavorite ? "/public/svg/like-active.svg" : "/public/svg/like.svg"
          }
          alt={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        />
        <span className={styles.link}>
          {isFavorite ? "В избранном" : "В избранное"}
        </span>
      </div>
    </li>
  );
};
