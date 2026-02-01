import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");

  // const data = [
  //   {
  //     title: "Black Widow",
  //     src: "/public/img/cardImage1.png",
  //     star: 324,
  //   },
  //   {
  //     title: "Shang Chi",
  //     src: "/public/img/cardImage2.png",
  //     star: 124,
  //   },
  //   {
  //     title: "Loki",
  //     src: "/public/img/cardImage3.png",
  //     star: 235,
  //   },
  //   {
  //     title: "How I Met Your Mother",
  //     src: "/public/img/cardImage4.png",
  //     star: 123,
  //   },
  //   {
  //     title: "Money Heist",
  //     src: "/public/img/cardImage5.png",
  //     star: 8125,
  //   },
  //   {
  //     title: "Friends",
  //     src: "/public/img/cardImage6.png",
  //     star: 123,
  //   },
  //   {
  //     title: "The Big Bang Theory",
  //     src: "/public/img/cardImage7.png",
  //     star: 12,
  //   },
  //   {
  //     title: "Two And a Half Men",
  //     src: "/public/img/cardImage8.png",
  //     star: 456,
  //   },
  // ];

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  // Сохранение
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(user));
  }, [user]);

  const saveName = () => {
    if (name) {
      setUser([...user, { name, isLogined: true }]);
      setName("");
    }
  };

  return (
    <>
      <Header user={user[0].name} />

      <Search
        value={name}
        placeholder={"Ваше имя"}
        svg={false}
        onChange={(e) => setName(e.target.value)}
      />
      <Button text={"Войти в профиль"} big onClick={saveName}></Button>
    </>
  );
}

export default App;
