import cn from "classnames";
import styles from "./Button.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  big?: boolean;
}

export const Button = ({ children, big = false, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, { [styles.big]: big })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
