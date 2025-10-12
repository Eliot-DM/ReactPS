import "./Button.css";

const Button = ({ text, big = false }) => {
  return <button className={big ? "button big" : "button"}>{text}</button>;
};

export default Button;
