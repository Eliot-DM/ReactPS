import styles from "./Button.module.css";
import cn from "classnames";

const Button = ({ text, big = false, onClick }) => {
  return (
    <button
      className={cn(styles.button, { [styles.big]: big })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
