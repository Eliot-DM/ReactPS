import "./Card.css";

const Card = ({ title, src, star }) => {
  return (
    <li className="card">
      <div className="star">
        <img className="star-svg" src="/public/svg/star.svg" alt="" />
        <p className="star-text">{star}</p>
      </div>
      <img className="img" src={src} alt="" />
      <p className="card-title">{title}</p>

      <div className="block-link">
        <img className="like-svg" src="/public/svg/like.svg" alt="" />{" "}
        <a className="link" href="">
          В избранное
        </a>
      </div>
    </li>
  );
};

export default Card;
