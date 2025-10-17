import Card from "../../components/card/card";
import CardList from "../../components/CardList/CardList";
import "./Body.css";

const Body = ({ data }) => {
  return (
    <div className="body">
      <CardList data={data} />
    </div>
  );
};

export default Body;
