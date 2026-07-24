import { Button } from "../../components/Button/Button";
import { CardList } from "../../components/CardList/CardList";
import { Heading } from "../../components/Heading/Heading";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { Search } from "../../components/Search/Search";
import axios from "axios";
import styles from "./Body.module.css";
import { PREFIX } from "../../helpers/API";
import { useEffect, useState, useCallback } from "react";

interface Movie {
  // Добавьте правильную типизацию для фильмов
  id: string;
  title: string;
  description?: string;
  // ... другие поля
}

export const Body = () => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const dataList = useCallback(async () => {
    try {
      const { data } = await axios.get<Movie[]>(`${PREFIX}?q=${searchValue}`);
      setMovie(data);
    } catch (e) {
      console.error(e);
      setMovie([]);
    }
  }, [searchValue]); // Добавляем searchValue в зависимости

  useEffect(() => {
    if (searchValue) {
      dataList();
    }
  }, [searchValue, dataList]); // Запускаем только при изменении searchValue

  const handleSearch = () => {
    if (searchValue.trim()) {
      dataList();
    }
  };

  return (
    <>
      <Heading>Поиск</Heading>
      <Paragraph>
        Введите название фильма, сериала или мультфильма для поиска и добавления
        в избранное.
      </Paragraph>
      <Search
        placeholder={"Введите название"}
        svg={true}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button big onClick={handleSearch}>
        Искать
      </Button>
      <div className={styles.body}>
        <CardList data={movie} />
      </div>
    </>
  );
};

export default Body;
