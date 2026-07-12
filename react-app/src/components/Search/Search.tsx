import { InputHTMLAttributes } from "react";
import styles from "./Search.module.css";
import cn from "classnames";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  svg: boolean;
}

export const Search = ({ svg = false }: SearchProps) => {
  return (
    <div className={styles.search}>
      {svg && (
        <img className={styles.svg} src="/public/svg/search.svg" alt="" />
      )}
      <input
        className={cn(styles.input, {
          [styles.inputSearch]: svg,
        })}
        type="text"
      />
    </div>
  );
};
