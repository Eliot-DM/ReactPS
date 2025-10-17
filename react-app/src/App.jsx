import "./App.css";
import Button from "./components/Button/Button";
import Heading from "./components/Heading/Heading";
import Paragraph from "./components/Paragraph/Paragraph";
import Body from "./Layouts/Body/Body";
import Header from "./Layouts/Header/Header";
import Search from "./components/Search/Search";
import CardList from "./components/CardList/CardList";
import Card from "./components/card/card";

function App() {
  const data = [
    {
      title: "Black Widow",
      src: "/public/img/cardImage1.png",
      star: 324,
    },
    {
      title: "Shang Chi",
      src: "/public/img/cardImage2.png",
      star: 124,
    },
    {
      title: "Loki",
      src: "/public/img/cardImage3.png",
      star: 235,
    },
    {
      title: "How I Met Your Mother",
      src: "/public/img/cardImage4.png",
      star: 123,
    },
    {
      title: "Money Heist",
      src: "/public/img/cardImage5.png",
      star: 8125,
    },
    {
      title: "Friends",
      src: "/public/img/cardImage6.png",
      star: 123,
    },
    {
      title: "The Big Bang Theory",
      src: "/public/img/cardImage7.png",
      star: 12,
    },
    {
      title: "Two And a Half Men",
      src: "/public/img/cardImage8.png",
      star: 456,
    },
  ];
  return (
    <>
      <Header></Header> <Heading title={"Поиск"}></Heading>
      <Paragraph
        text={
          "Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
        }
      ></Paragraph>
      <Button text={"Искать"} big></Button>{" "}
      <Search svg placeholder={"Введите название"} />
      <Body data={data}></Body>
    </>
  );
}

export default App;
