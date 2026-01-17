import { useState } from "react";
import styles from "./Search.module.css";
import cn from "classnames";

const Search = ({ placeholder, svg = false }) => {
  const [inputDate, setInputDate] = useState("");
  const inputChange = (e) => {
    setInputDate(e.target.value);
    console.log(inputDate);
  };
  return (
    <div className={styles.search}>
      {svg && (
        <img className={styles.svg} src="/public/svg/search.svg" alt="" />
      )}
      <input
        className={cn(styles.input, {
          [styles.inputSearch]: svg,
        })}
        placeholder={placeholder}
        type="text"
        value={inputDate}
        onChange={inputChange}
      />
    </div>
  );
};

export default Search;
