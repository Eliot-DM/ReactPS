import CardList from "../../components/CardList/CardList";
import styles from "./Body.module.css";

const Body = ({ data }) => {
  return (
    <div className={styles.body}>
      <CardList data={data} />
    </div>
  );
};

export default Body;
