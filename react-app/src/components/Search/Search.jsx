import styles from "./Search.module.css";
import cn from "classnames";

export const Search = ({ placeholder, svg = false, onChange, value }) => {
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
