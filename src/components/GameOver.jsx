export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      {winner && <p>{winner}, you won!</p>}
      {!winner && <p>we have a draw!</p>}
      <button onClick={onRestart}>Rematch</button>
    </div>
  );
}
