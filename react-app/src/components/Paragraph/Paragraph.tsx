import styles from "./Paragraph.module.css";

interface ParagraphProps {
  children: string;
}

export const Paragraph = ({ children }: ParagraphProps) => {
  return <p className={styles.paragraph}>{children}</p>;
};
