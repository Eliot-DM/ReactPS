import { Button } from "../../components/Button/Button";
import { CardList } from "../../components/CardList/CardList";
import { Heading } from "../../components/Heading/Heading";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { Search } from "../../components/Search/Search";
import axios from "axios";
import styles from "./Body.module.css";
import { PREFIX } from "../../helpers/API";
import { useEffect, useState } from "react";

interface BodyProps {
  data: [];
}

export const Body = ({ data }: BodyProps) => {
  const [movie, setMovie] = useState<BodyProps>();
 const [value, setValue] = useState<string>();
  const dataList = async () => {
    try {
      const { data } = await axios.get<[]>(`${PREFIX}?q=${}`);
      setMovie(data);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  useEffect(() => {
    dataList();
  });

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
        <CardList data={movie} />
      </div>
    </>
  );
};
