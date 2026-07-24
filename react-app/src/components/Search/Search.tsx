import styles from "./Search.module.css";

interface SearchProps {
  value: string;
  placeholder: string;
  svg: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ value, placeholder, svg, onChange }: SearchProps) => {
  return (
    <div className={styles.search}>
      {svg && <img src="/search.svg" alt="search" />}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};
