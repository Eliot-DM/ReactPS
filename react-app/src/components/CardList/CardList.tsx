import { Card } from "../Card/Card";
import styles from "./CardList.module.css";
import { Movie } from "../../store/favorites.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addFavorite, deleteFavorite } from "../../store/favorites.slice";

interface CardListProps {
  data: Movie[];
}

export const CardList = ({ data }: CardListProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorite);

  const isFavorite = (title: string) => {
    return favorites.some((movie) => movie.title === title);
  };

  const handleToggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.title)) {
      dispatch(deleteFavorite(movie.title));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  if (!data || data.length === 0) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <ul className={styles.cardList}>
      {data.map((movie) => (
        <Card
          key={movie.title}
          title={movie.title}
          star={movie.star}
          src={movie.src}
          isFavorite={isFavorite(movie.title)}
          onToggleFavorite={() => handleToggleFavorite(movie)}
        />
      ))}
    </ul>
  );
};
