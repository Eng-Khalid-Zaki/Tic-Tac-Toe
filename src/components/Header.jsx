import Img from "../assets/Images/game-logo.png";
import "./Styles/header.css";
export default function Header() {
  return (
    <header>
      <img src={Img} alt="logo" />
      <h1>Tic-Tac-Toe</h1>
    </header>
  );
}
