import styles from "./Heading.module.css";

export const Heading = ({ title }) => {
  return <h1 className={styles.heading}>{title}</h1>;
};
