import { useState } from "react";
export default function Player({
  InitialPlayerName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(InitialPlayerName);
  const [isEditing, setIsEditing] = useState(false);
  function handleClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerFinalName);
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  let playerFinalName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    playerFinalName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerFinalName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleClick}>{btnCaption}</button>
      </span>
    </li>
  );
}
