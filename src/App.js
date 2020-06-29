import React, { useEffect, useState } from "react";

import cross from "./assets/images/cross.png";
import circle from "./assets/images/circle.png";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [rows, setRows] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);
  const [boxesId, setBoxesId] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [boxes, setBoxes] = useState([
    { id: 1, symbol: "" },
    { id: 2, symbol: "" },
    { id: 3, symbol: "" },
    { id: 4, symbol: "" },
    { id: 5, symbol: "" },
    { id: 6, symbol: "" },
    { id: 7, symbol: "" },
    { id: 8, symbol: "" },
    { id: 9, symbol: "" },
  ]);
  const [turn, setTurn] = useState(1);
  const [symbol, setSymbol] = useState();

  useEffect(() => {
    turn % 2 === 0 ? setSymbol("X") : setSymbol("O");
  }, [turn]);

  useEffect(() => {
    console.log("boxes ", boxes);
    if (boxes.filter((a) => a.symbol === "").length === 0) {
      setGameOver(true);
    }

    for (let i = 0; i < rows.length; i++) {
      const [a, b, c] = rows[i];

      // Check if the game board contains winning combination
      if (
        boxes[a].symbol &&
        boxes[a].symbol === boxes[b].symbol &&
        boxes[a].symbol === boxes[c].symbol
      ) {
        const answer = window.confirm(
          `${
            boxes[a].symbol === "O" ? "Vous avez gagné" : "L'ordinateur a gagné"
          }. Rejouer ?`
        );

        if (answer) {
          restart();
        }
      }
    }
  }, [boxes]);

  function boxClicked(box) {
    setTurn(turn + 1);
    if (boxes[box - 1].symbol === "") {
      setBoxes(boxes.map((b) => (b.id === box ? { ...b, symbol } : b)));
    }
  }

  function restart() {
    setBoxes([
      { id: 1, symbol: "" },
      { id: 2, symbol: "" },
      { id: 3, symbol: "" },
      { id: 4, symbol: "" },
      { id: 5, symbol: "" },
      { id: 6, symbol: "" },
      { id: 7, symbol: "" },
      { id: 8, symbol: "" },
      { id: 9, symbol: "" },
    ]);
    setTurn(1);
    setSymbol();
  }

  return (
    <div className="App">
      <div id="board">
        <div className="line">
          {boxesId &&
            boxesId.slice(0, 3).map((box, index) => (
              <div className="box" key={index} onClick={() => boxClicked(box)}>
                {boxes[box - 1].symbol === "O" && (
                  <img src={circle} className="circle" alt="circle" />
                )}
                {boxes[box - 1].symbol === "X" && (
                  <img src={cross} className="cross" alt="cross" />
                )}
              </div>
            ))}
        </div>
        <div className="line">
          {boxesId &&
            boxesId.slice(3, 6).map((box, index) => (
              <div className="box" key={index} onClick={() => boxClicked(box)}>
                {boxes[box - 1].symbol === "O" && (
                  <img src={circle} className="circle" alt="circle" />
                )}
                {boxes[box - 1].symbol === "X" && (
                  <img src={cross} className="cross" alt="cross" />
                )}
              </div>
            ))}
        </div>
        <div className="line">
          {boxesId &&
            boxesId.slice(6, 9).map((box, index) => (
              <div className="box" key={index} onClick={() => boxClicked(box)}>
                {boxes[box - 1].symbol === "O" && (
                  <img src={circle} className="circle" alt="circle" />
                )}
                {boxes[box - 1].symbol === "X" && (
                  <img src={cross} className="cross" alt="cross" />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
