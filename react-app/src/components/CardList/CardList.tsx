import { Card } from "../Card/Card";
import styles from "./CardList.module.css";

interface CardListProps {
  data: [
    {
      title: string;
      src: string;
      star: string;
    },
  ];
}

export const CardList = ({ data }: CardListProps) => {
  return (
    <ul className={styles.cardList}>
      {data.map((el, i) => (
        <Card key={i} title={el.title} star={el.star} src={el.src} />
      ))}
    </ul>
  );
};
