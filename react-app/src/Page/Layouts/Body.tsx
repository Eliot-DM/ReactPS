import { Button } from "../../components/Button/Button";
import { CardList } from "../../components/CardList/CardList";
import { Heading } from "../../components/Heading/Heading";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { Search } from "../../components/Search/Search";
import styles from "./Body.module.css";

interface BodyProps {
  data: [];
}

export const Body = ({ data }: BodyProps) => {
  return (
    <>
      <Heading>Поиск</Heading>
      <Paragraph>
        Введите название фильма, сериала или мультфильма для поиска и добавления
        в избранное.
      </Paragraph>
      <Button big>Искать</Button>
      <Search
        placeholder={"Введите название"}
        svg={true}
        onChange={undefined}
        value={undefined}
      />
      <div className={styles.body}>
        <CardList data={data} />
      </div>
    </>
  );
};
