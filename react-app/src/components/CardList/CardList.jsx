import Card from "../card/card";
import styles from "./CardList.module.css";

const CardList = ({ data }) => {
  return (
    <ul className={styles.cardList}>
      {data.map((el, i) => (
        <Card key={i} title={el.title} star={el.star} src={el.src} />
      ))}
    </ul>
  );
};

export default CardList;
