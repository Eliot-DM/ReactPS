import "./Button.css";

function Button({ text, big = false }) {
  return <button className={big ? "button big" : "button"}>{text}</button>;
}

export default Button;
