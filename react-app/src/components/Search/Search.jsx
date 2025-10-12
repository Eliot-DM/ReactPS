import { useState } from "react";
import "./Search.css";

const Search = ({ placeholder, svg = false }) => {
  const [inputDate, setInputDate] = useState("");
  const inputChange = (e) => {
    setInputDate(e.target.value);
    console.log(inputDate);
  };
  return (
    <div className="search-block">
      <img
        className={svg ? "search-svg" : "no-search-svg"}
        src="search.svg"
        alt=""
      />
      <input
        className={svg ? "search search-p" : "search"}
        placeholder={placeholder}
        type="text"
        value={inputDate}
        onChange={inputChange}
      />
    </div>
  );
};

export default Search;
