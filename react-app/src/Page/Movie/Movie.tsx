import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addFavorite, deleteFavorite } from "../../store/favorites.slice";
import styles from "./Movie.module.css";

interface MovieData {
  id: string;
  title: string;
  originalTitle?: string;
  description?: string;
  descriptionPlainText?: string;
  releaseDate?: string;
  duration?: number;
  genres?: string[];
  rating?: {
    stars: number;
    count: number;
  };
  poster?: {
    url: string;
    width: number;
    height: number;
  };
  type?: string;
  reviews?: Review[];
}

interface Review {
  author: string;
  title: string;
  text: string;
  date: string;
  rating: number;
}

export const Movie = () => {
  const movieData = useLoaderData() as MovieData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state: RootState) => state.favorites.favorite);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!movieData) {
    return <div>Фильм не найден</div>;
  }

  const isFavorite = favorites.some((movie) => movie.title === movieData.title);

  const handleToggleFavorite = () => {
    if (!currentUser) {
      alert("Войдите в систему, чтобы добавить в избранное");
      return;
    }

    const movieToSave = {
      title: movieData.title,
      src: movieData.poster?.url || "",
      star: movieData.rating?.stars.toString() || "0",
    };

    if (isFavorite) {
      dispatch(deleteFavorite(movieData.title));
    } else {
      dispatch(addFavorite(movieToSave));
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Неизвестно";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}мин` : `${mins} мин`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Неизвестно";
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.movie}>
      <div className={styles.block_top}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Поиск фильмов
        </button>
        <h1 className={styles.movieTitle}>{movieData.title}</h1>
        {movieData.originalTitle &&
          movieData.originalTitle !== movieData.title && (
            <p className={styles.originalTitle}>{movieData.originalTitle}</p>
          )}
      </div>

      <div className={styles.block_mid}>
        <div className={styles.posterContainer}>
          {movieData.poster?.url ? (
            <img
              src={movieData.poster.url}
              alt={movieData.title}
              className={styles.poster}
            />
          ) : (
            <div className={styles.noPoster}>Нет постера</div>
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.description}>
            {movieData.description ||
              movieData.descriptionPlainText ||
              "Описание отсутствует"}
          </p>

          <div className={styles.details}>
            {movieData.rating && (
              <div className={styles.star}>
                <img
                  className={styles.star_svg}
                  src="/public/svg/star.svg"
                  alt="Рейтинг"
                />
                <p className={styles.star_text}>
                  {movieData.rating.stars.toFixed(1)}
                </p>
                {movieData.rating.count > 0 && (
                  <span className={styles.ratingCount}>
                    ({movieData.rating.count} оценок)
                  </span>
                )}
              </div>
            )}

            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
              onClick={handleToggleFavorite}
            >
              <img
                className={styles.like_svg}
                src={
                  isFavorite
                    ? "/public/svg/like-active.svg"
                    : "/public/svg/like.svg"
                }
                alt="Избранное"
              />
              <span>{isFavorite ? "В избранном" : "В избранное"}</span>
            </button>

            {movieData.type && (
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>Тип</p>
                <p className={styles.detailValue}>
                  {movieData.type === "movie"
                    ? "Фильм"
                    : movieData.type === "series"
                      ? "Сериал"
                      : movieData.type}
                </p>
              </div>
            )}

            {movieData.releaseDate && (
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>Дата выхода</p>
                <p className={styles.detailValue}>
                  {formatDate(movieData.releaseDate)}
                </p>
              </div>
            )}

            {movieData.duration && (
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>Длительность</p>
                <p className={styles.detailValue}>
                  {formatDuration(movieData.duration)}
                </p>
              </div>
            )}

            {movieData.genres && movieData.genres.length > 0 && (
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>Жанр</p>
                <p className={styles.detailValue}>
                  {movieData.genres.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {movieData.reviews && movieData.reviews.length > 0 && (
        <div className={styles.block_bottom}>
          <h2 className={styles.reviewsTitle}>
            Отзывы ({movieData.reviews.length})
          </h2>
          <div className={styles.reviewsList}>
            {movieData.reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div>
                    <p className={styles.reviewAuthor}>{review.author}</p>
                    <p className={styles.reviewDate}>
                      {formatDate(review.date)}
                    </p>
                  </div>
                  {review.rating && (
                    <div className={styles.reviewRating}>
                      ⭐ {review.rating}
                    </div>
                  )}
                </div>
                {review.title && (
                  <h3 className={styles.reviewTitle}>{review.title}</h3>
                )}
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
