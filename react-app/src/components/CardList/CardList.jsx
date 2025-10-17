import Card from "../card/card";
import "./CardList.css";

const CardList = ({ data }) => {
  return (
    <ul className="card-list">
      {data.map((el, i) => (
        <Card key={i} title={el.title} star={el.star} src={el.src} />
      ))}
    </ul>
  );
};

export default CardList;
