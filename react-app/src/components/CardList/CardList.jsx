import Card from "../Card/Card";
import styles from "./CardList.module.css";

export const CardList = ({ data }) => {
  return (
    <ul className={styles.cardList}>
      {data.map((el, i) => (
        <Card key={i} title={el.title} star={el.star} src={el.src} />
      ))}
    </ul>
  );
};
