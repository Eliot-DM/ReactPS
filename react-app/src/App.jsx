import "./App.css";
import Button from "./components/Button/Button";
import Heading from "./components/Heading/Heading";
import Paragraph from "./components/Paragraph/Paragraph";
import Body from "./Layouts/Body/Body";
import Header from "./Layouts/Header/Header";
import Search from "./components/Search/Search";

function App() {
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
      <Body></Body>
    </>
  );
}

export default App;
