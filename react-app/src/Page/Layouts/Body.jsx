import CardList from "../../components/CardList/CardList";
import styles from "./Body.module.css";

const Body = ({ data }) => {
  return (
    <>
      <Heading title={"Поиск"}></Heading>
      <Paragraph
        text={
          "Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
        }
      ></Paragraph>
      <Button text={"Искать"} big></Button>
      <Search placeholder={"Введите название"} svg={true} />
      <div className={styles.body}>
        <CardList data={data} />
      </div>
    </>
  );
};

export default Body;
