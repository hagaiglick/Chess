import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
// fromSquare "10"
// toSquare "21"
// mapObj
// 2. mapObj[toSquare] = mapObj[fromSquare] to the obj
// 1. delete the property whose key is "fromSquare" from mapObj

const mapObj = {
  "00": { type: "rook", player: "black" },
  "01": { type: "rook", player: "black" },
  // "01": { type: "knight", player: "black" },
  "02": { type: "bishop", player: "black" },
  "03": { type: "king", player: "black" },
  "04": { type: "queen", player: "black" },
  "05": { type: "bishop", player: "black" },
  "06": { type: "knight", player: "black" },
  "07": { type: "rook", player: "black" },
  "10": { type: "pawn", player: "black" },
  "11": { type: "pawn", player: "black" },
  "12": { type: "pawn", player: "black" },
  "13": { type: "pawn", player: "black" },
  "14": { type: "pawn", player: "black" },
  "15": { type: "pawn", player: "black" },
  "16": { type: "pawn", player: "black" },
  "17": { type: "pawn", player: "black" },
  "60": { type: "pawn", player: "white" },
  "61": { type: "pawn", player: "white" },
  "62": { type: "pawn", player: "white" },
  "63": { type: "pawn", player: "white" },
  "64": { type: "pawn", player: "white" },
  "65": { type: "pawn", player: "white" },
  "66": { type: "pawn", player: "white" },
  "67": { type: "pawn", player: "white" },
  "70": { type: "rook", player: "white" },
  "71": { type: "knight", player: "white" },
  "72": { type: "bishop", player: "white" },
  "73": { type: "queen", player: "white" },
  "74": { type: "king", player: "white" },
  "75": { type: "bishop", player: "white" },
  "76": { type: "knight", player: "white" },
  "77": { type: "rook", player: "white" },
};
const movePiece = (fromSquare, toSquare) => {
  console.log("function:", fromSquare, toSquare);
  // 1. mapObj[toSquare] = mapObj[fromSquare] to the obj
  // 2. delete the property whose key is "fromSquare" from mapObj
  mapObj[toSquare] = mapObj[fromSquare];
  delete mapObj[fromSquare];
};
// movePiece("10", "30");
const Square = ({ color, piece = {}, onClick }) => {
  let pieceChar;
  switch (piece.type) {
    case "rook":
      pieceChar = "♖";
      break;
    case "knight":
      pieceChar = "♘";
      break;
    case "bishop":
      pieceChar = "♗";
      break;
    case "king":
      pieceChar = "♕";
      break;
    case "queen":
      pieceChar = "♔";
      break;
    case "pawn":
      pieceChar = "♙";
      break;
  }
  return (
    <div
      onClick={onClick}
      style={{
        color: piece.player === "white" ? "green" : "blue",
        border: "black solid 1px",
        height: "70px",
        width: "70px",
        backgroundColor: color === "black" ? "white" : "gray",
        fontSize: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pieceChar}
    </div>
  );
};
const Board = () => {
  //from here
  const [board, setBoard] = useState({
    fromSquare: "",
    toSquare: "",
    count: 0,
  });

  const handleClick = (con) => {
    const { count } = board;
    if (count === 0) {
      setBoard((prevBoard) => ({
        ...prevBoard,
        fromSquare: con,
        count: count + 1,
      }));
      return;
    }
    setBoard((prevBoard) => ({ ...prevBoard, toSquare: con, count: 0 }));
  };

  useEffect(() => {
    const { fromSquare, toSquare } = board;

    if (fromSquare && toSquare) {
      console.log("inside", fromSquare, toSquare);
      movePiece(fromSquare, toSquare);
      setBoard((prevBoard) => ({ ...prevBoard, toSquare: "" }));
    }
  }, [board]);

  //ad kan
  return (
    <div>
      {Array(8)
        .fill(0)
        .map((e, rowIndex) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {Array(8)
                .fill(0)
                .map((e, squareIndex) => {
                  const colorPic =
                    (squareIndex + rowIndex) % 2 === 0 ? "white" : "black";

                  const numRow = rowIndex.toString();
                  const numSquare = squareIndex.toString();
                  const con = numRow.concat(numSquare);
                  const piece = mapObj[con];

                  return (
                    <Square
                      color={colorPic}
                      piece={piece}
                      onClick={() => handleClick(con)}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
