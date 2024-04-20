import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Header from "./components/Header.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "../winningCompinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "player 2",
  });
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  let activePlayer = deriveActivePlayer(gameTurns);
  let winner;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function updatePlayers(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function restart() {
    setGameTurns([]);
  }
  return (
    <>
      <Header></Header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            InitialPlayerName="player 1"
            symbol="X"
            isActive={activePlayer == "X"}
            onChangeName={updatePlayers}
          ></Player>
          <Player
            InitialPlayerName="player 2"
            symbol="O"
            isActive={activePlayer == "O"}
            onChangeName={updatePlayers}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={restart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </>
  );
}

export default App;
