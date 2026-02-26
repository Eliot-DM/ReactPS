import styles from "./Button.module.css";
import cn from "classnames";

export const Button = ({ text, big = false, onClick }) => {
  return (
    <button
      className={cn(styles.button, { [styles.big]: big })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
