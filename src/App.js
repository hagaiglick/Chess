import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Square from "./Square";
// import styled from "styled-components";

// fromSquare "10"
// toSquare "21"
// mapObj
// 2. mapObj[toSquare] = mapObj[fromSquare] to the obj
// 1. delete the property whose key is "fromSquare" from mapObj

// const Div = styled.div({
//   background: "yellow",
//   opacity: "1",
//   ":hover": {
//     background: "red",

//   },
// });

const mapObj = {
  "00": { type: "rook", player: "black" },
  "01": { type: "rook", player: "black" },
  "01": { type: "knight", player: "black" },
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

// movePiece("10", "30");

const Board = () => {
  const [count, setCount] = useState(0);
  const [fromSquare, setFromSquare] = useState();
  // const [toSquare, setToSquare] = useState();

  const movePawn = (fromMove, con) => {
    if (fromMove[0] - con[0] === 1) {
      if (fromMove[1] - con[1] === 0) {
        return movePiece(fromSquare, con);
      }
    }
    return console.log("nah");
  };
  const moveRook = (fromMove, con) => {
    if (
      fromMove[0] - con[0] === 0 ||
      fromMove[0] - con[0] === 1 ||
      fromMove[0] - con[0] === 2 ||
      fromMove[0] - con[0] === 3 ||
      fromMove[0] - con[0] === 4 ||
      fromMove[0] - con[0] === 5 ||
      fromMove[0] - con[0] === 6 ||
      fromMove[0] - con[0] === 7 ||
      fromMove[0] - con[0] === -1 ||
      fromMove[0] - con[0] === -2 ||
      fromMove[0] - con[0] === -3 ||
      fromMove[0] - con[0] === -4 ||
      fromMove[0] - con[0] === -5 ||
      fromMove[0] - con[0] === -6 ||
      fromMove[0] - con[0] === -7
    ) {
      if (fromMove[1] - con[1] === 0) {
        return movePiece(fromSquare, con);
      }
    }
    if (fromMove[0] - con[0] === 0) {
      if (
        fromMove[1] - con[1] === 0 ||
        fromMove[1] - con[1] === 1 ||
        fromMove[1] - con[1] === 2 ||
        fromMove[1] - con[1] === 3 ||
        fromMove[1] - con[1] === 4 ||
        fromMove[1] - con[1] === 5 ||
        fromMove[1] - con[1] === 6 ||
        fromMove[1] - con[1] === 7 ||
        fromMove[1] - con[1] === -1 ||
        fromMove[1] - con[1] === -2 ||
        fromMove[1] - con[1] === -3 ||
        fromMove[1] - con[1] === -4 ||
        fromMove[1] - con[1] === -5 ||
        fromMove[1] - con[1] === -6 ||
        fromMove[1] - con[1] === -7
      ) {
        return movePiece(fromSquare, con);
      }
    }
  };
  const moveKnight = (fromMove, con) => {
    if (fromMove[0] - con[0] === 1 || fromMove[0] - con[0] === -1) {
      if (fromMove[1] - con[1] === -2 || fromMove[1] - con[1] === 2) {
        return movePiece(fromSquare, con);
      }
    } else if (fromMove[0] - con[0] === 2 || fromMove[0] - con[0] === -2) {
      if (fromMove[1] - con[1] === 1 || fromMove[1] - con[1] === -1) {
        return movePiece(fromSquare, con);
      }
    }
  };
  const moveBishop = (fromMove, con) => {
    let i = fromMove[0] - con[0];
    if (fromMove[0] - con[0] === i || fromMove[0] - con[0] === -i) {
      if (fromMove[1] - con[1] === i || fromMove[1] - con[1] === -i) {
        return movePiece(fromSquare, con);
      }
    }
  };
  const moveQueen = (fromMove, con) => {
    let i = fromMove[0] - con[0];
    if (
      fromMove[0] - con[0] === i ||
      fromMove[0] - con[0] === -i ||
      fromMove[0] - con[0] === 0
    ) {
      if (
        fromMove[1] - con[1] === i ||
        fromMove[1] - con[1] === -i ||
        fromMove[1] - con[1] === 0
      ) {
        return movePiece(fromSquare, con);
      }
    }
    if (fromMove[0] - con[0] === 0) {
      if (
        fromMove[1] - con[1] === 0 ||
        fromMove[1] - con[1] === 1 ||
        fromMove[1] - con[1] === 2 ||
        fromMove[1] - con[1] === 3 ||
        fromMove[1] - con[1] === 4 ||
        fromMove[1] - con[1] === 5 ||
        fromMove[1] - con[1] === 6 ||
        fromMove[1] - con[1] === 7 ||
        fromMove[1] - con[1] === -1 ||
        fromMove[1] - con[1] === -2 ||
        fromMove[1] - con[1] === -3 ||
        fromMove[1] - con[1] === -4 ||
        fromMove[1] - con[1] === -5 ||
        fromMove[1] - con[1] === -6 ||
        fromMove[1] - con[1] === -7
      ) {
        return movePiece(fromSquare, con);
      }
    }
    return console.log("nah");
  };
  const moveKing = (fromMove, con) => {
    if (
      fromMove[0] - con[0] === 1 ||
      fromMove[0] - con[0] === 0 ||
      fromMove[0] - con[0] === -1
    ) {
      if (
        fromMove[1] - con[1] === 1 ||
        fromMove[1] - con[1] === 0 ||
        fromMove[1] - con[1] === -1
      ) {
        return movePiece(fromSquare, con);
      }
    }
    return console.log("nah");
  };
  const movePiece = (fromSquare, toSquare) => {
    console.log("inside move", fromSquare, toSquare);
    // 1. mapObj[toSquare] = mapObj[fromSquare] to the obj
    // 2. delete the property whose key is "fromSquare" from mapObj
    mapObj[toSquare] = mapObj[fromSquare];
    delete mapObj[fromSquare];
  };
  // useEffect(() => {
  //   console.log("inEffect", fromSquare, toSquare);
  //   if (fromSquare && toSquare) {
  //     movePiece(fromSquare, toSquare);
  //     // setToSquare();
  //   }
  // }, [fromSquare, toSquare]);

  // console.log("fromSquare:", fromSquare);
  // console.log("ToSquare:", toSquare);
  // const borderHover = "black solid 1px";
  // console.log(borderHover);
  // let isHovered = false;

  // const handleMouseOver = (colorPic, borderHover) => {
  //   if (count === 0) {
  //     // borderHover = "red solid 1px";
  //     // console.log(borderHover);
  //     // console.log("color:", colorPic);
  //     isHovered = true;
  //     // colorPic = "black";
  //     // console.log("color2:", colorPic);P

  //     console.log(isHovered);
  //   }
  // };

  const handleClick = (con) => {
    if (count === 0) {
      if (mapObj[con] === undefined) {
        return;
      }
    }
    if (count === 0) {
      setFromSquare(con);
      setCount(count + 1);
      return;
    }
    //second click
    // fromSquare -> toSqaure
    if (mapObj[fromSquare].type === "pawn") {
      movePawn(fromSquare, con);
      setCount(0);
      return;
    }
    if (mapObj[fromSquare].type === "rook") {
      moveRook(fromSquare, con);
      setCount(0);
      return;
    }
    if (mapObj[fromSquare].type === "knight") {
      moveKnight(fromSquare, con);
      setCount(0);
      return;
    }
    if (mapObj[fromSquare].type === "bishop") {
      moveBishop(fromSquare, con);
      setCount(0);
      return;
    }
    if (mapObj[fromSquare].type === "king") {
      moveKing(fromSquare, con);
      setCount(0);
      return;
    }
    if (mapObj[fromSquare].type === "queen") {
      moveQueen(fromSquare, con);
      setCount(0);
      return;
    }
    setCount(0);
  };

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
                      // onMouseOver={() => handleMouseOver(colorPic)}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );

  /* return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="white" piece={{ type: "rook", player: "white" }} />
        <Square color="black" piece={{ type: "knight", player: "white" }} />
        <Square color="white" piece={{ type: "bishop", player: "white" }} />
        <Square color="black" piece={{ type: "king", player: "white" }} />
        <Square color="white" piece={{ type: "queen", player: "white" }} />
        <Square color="black" piece={{ type: "bishop", player: "white" }} />
        <Square color="white" piece={{ type: "knight", player: "white" }} />
        <Square color="black" piece={{ type: "rook", player: "white" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: "pawn", player: "white" }} />
        <Square color="white" piece={{ type: "pawn", player: "white" }} />
        <Square color="black" piece={{ type: "pawn", player: "white" }} />
        <Square color="white" piece={{ type: "pawn", player: "white" }} />
        <Square color="black" piece={{ type: "pawn", player: "white" }} />
        <Square color="white" piece={{ type: "pawn", player: "white" }} />
        <Square color="black" piece={{ type: "pawn", player: "white" }} />
        <Square color="white" piece={{ type: "pawn", player: "white" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
        <Square color="black" piece={{ type: null, player: "black" }} />
        <Square color="white" piece={{ type: null, player: "black" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: "pawn", player: "black" }} />
        <Square color="white" piece={{ type: "pawn", player: "black" }} />
        <Square color="black" piece={{ type: "pawn", player: "black" }} />
        <Square color="white" piece={{ type: "pawn", player: "black" }} />
        <Square color="black" piece={{ type: "pawn", player: "black" }} />
        <Square color="white" piece={{ type: "pawn", player: "black" }} />
        <Square color="black" piece={{ type: "pawn", player: "black" }} />
        <Square color="white" piece={{ type: "pawn", player: "black" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Square color="black" piece={{ type: "rook", player: "black" }} />
        <Square color="white" piece={{ type: "knight", player: "black" }} />
        <Square color="black" piece={{ type: "bishop", player: "black" }} />
        <Square color="white" piece={{ type: "queen", player: "black" }} />
        <Square color="black" piece={{ type: "king", player: "black" }} />
        <Square color="white" piece={{ type: "bishop", player: "black" }} />
        <Square color="black" piece={{ type: "knight", player: "black" }} />
        <Square color="white" piece={{ type: "rook", player: "black" }} />
      </div>
    </div>
   );*/
};

function App() {
  return (
    <div className="App">
      <Board />
      {/* <Square color="white" piece={{type:"rook", player:"black"}} /> */}
    </div>
  );
}

export default App;
