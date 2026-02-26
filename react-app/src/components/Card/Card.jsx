import styles from "./Card.module.css";

export const Card = ({ title, src, star }) => {
  return (
    <li className={styles.card}>
      <div className={styles.star}>
        <img className={styles.star_svg} src="/public/svg/star.svg" alt="" />
        <p className={styles.star_text}>{star}</p>
      </div>
      <img className={styles.img} src={src} alt="" />
      <p className={styles.card_title}>{title}</p>

      <div className={styles.block_link}>
        <img className={styles.like_svg} src="/public/svg/like.svg" alt="" />{" "}
        <a className={styles.link} href="">
          В избранное
        </a>
      </div>
    </li>
  );
};
