import styles from "./Card.module.css";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  star: string;
  src: string;
  isFavorite?: boolean; // Опциональный пропс
  onToggleFavorite?: () => void; // Опциональный пропс
}

export const Card = ({
  title,
  star,
  src,
  isFavorite = false,
  onToggleFavorite,
}: CardProps) => {
  return (
    <li className={styles.card}>
      <Link to={`/movie/${title}`}>
        <img src={src} alt={title} className={styles.image} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.star}>⭐ {star}</p>
      </Link>
      {onToggleFavorite && (
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}
    </li>
  );
};
