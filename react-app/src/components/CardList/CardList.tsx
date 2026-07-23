import { Card } from "../Card/Card";
import styles from "./CardList.module.css";
import { Movie } from "../../store/favorites.slice"; // используем общий тип

interface CardListProps {
  data: Movie[]; // Используем Movie[] вместо сложной типизации
}

export const CardList = ({ data }: CardListProps) => {
  if (!data || data.length === 0) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <ul className={styles.cardList}>
      {data.map((movie) => (
        <Card
          key={movie.title} // лучше использовать title вместо индекса
          title={movie.title}
          star={movie.star}
          src={movie.src}
        />
      ))}
    </ul>
  );
};
