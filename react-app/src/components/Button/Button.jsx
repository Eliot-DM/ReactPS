import "./Button.css";

const Button = ({ text, big = false, onClick }) => {
  return (
    <button className={big ? "button big" : "button"} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
