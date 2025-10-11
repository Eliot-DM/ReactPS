import "./App.css";
import Button from "./components/Button/Button";
import Heading from "./components/Heading/Heading";
import Paragraph from "./components/Paragraph/Paragraph";

function App() {
  return (
    <>
      <Heading title={"Поиск"}></Heading>

      <Paragraph
        text={
          "Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
        }
      ></Paragraph>

      <Button text={"Искать"} big></Button>
    </>
  );
}

export default App;
