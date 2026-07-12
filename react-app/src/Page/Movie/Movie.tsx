import styles from "./Movie.module.css";

interface MovieProps {}

export const Movie = () => {
  return (
    <>
      Movie
      <div className={styles.block_top}>
        <p>Поиск фильмов</p>
        <p>Avengers: Endgame</p>
      </div>
      <div className="block_mid">
        <img src="" alt="" />
        <div>
          <p>
            After the devastating events of Avengers: Infinity War, the universe
            is in ruins due to the efforts of the Mad Titan, Thanos. With the
            help of remaining allies, the Avengers must assemble once more in
            order to undo Thanos' actions and restore order to the universe once
            and for all, no matter what consequences may be in store.
          </p>
          <div>
            <div className={styles.star}>
              <img
                className={styles.star_svg}
                src="/public/svg/star.svg"
                alt=""
              />
              <p className={styles.star_text}>5.5</p>
            </div>

            <div className={styles.block_link}>
              <img
                className={styles.like_svg}
                src="/public/svg/like.svg"
                alt=""
              />
              <a className={styles.link} href="">
                В избранное
              </a>
            </div>
            <div>
              <p>Тип</p>
              <p>Movie</p>
            </div>
            <div>
              <p>Дата выхода</p>
              <p>2019-04-24</p>
            </div>
            <div>
              <p>Длительность</p>
              <p>181 мин</p>
            </div>
            <div>
              <p>Жанр</p>
              <p>Adventure, Science Fiction, Action</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block_bottom">
        <p>Отзывы</p>
        <div>
          <div>
            <p>Not as good as infinity war..</p>
            <p>2019-04-29</p>
          </div>
          <p>
            But its a pretty good film. A bit of a mess in some parts, lacking
            the cohesive and effortless feel infinity war somehow managed to
            accomplish. Some silly plot holes and characters that could&apos;ve
            been cut (Ahem, captain marvel and thanos). The use of Captain
            marvel in this film was just ridiculous. Shes there at the start,
            bails for some reason? And then pops up at the end to serve no
            purpose but deux ex machina a space ship...
          </p>
        </div>
      </div>
    </>
  );
};
