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
  //database of the board
  "00": { type: "rook", player: "black" },
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
  const [player, setPlayer] = useState(true);
  // const [toSquare, setToSquare] = useState();
  const movePieceInvoke = (moveFrom, moveTo) => {
    // the actual movePiece
    movePiece(moveFrom, moveTo);
  };
  const splitAndParseToNumber = (square) => {
    const [row, col] = square.split("");
    console.log("splitted");
    return [parseInt(row), parseInt(col)];
  };

  const getTheFigurePath = (moveFrom, moveTo) => {
    const path = [];
    let passingSquare;
    const [moveFromRow, moveFromCol] = splitAndParseToNumber(moveFrom);
    const [moveToRow, moveToCol] = splitAndParseToNumber(moveTo);
    let j = moveFromCol;
    //fill the path with the squares we past
    //check witch is bigger , the rows move from or rows move to . if moveTo rows? then we going down, else going up
    //check the going up movements:TODO - SET IN A OTHER FUNCTION ?
    if (moveFromRow > moveToRow) {
      //going only up the board
      if (moveFromCol === moveToCol) {
        for (let i = moveFromRow; i >= moveToRow; i--) {
          passingSquare = i.toString() + moveFromCol.toString();
          path.push(passingSquare);
        }
      }
      //going up and move left
      else if (moveFromCol > moveToCol) {
        for (let i = moveFromRow; i >= moveToRow; i--) {
          passingSquare = i.toString() + j.toString();
          path.push(passingSquare);
          if (j >= moveToCol) j--;
        }
      }
      //move up and turn right
      else if (moveFromCol < moveToCol) {
        for (let i = moveFromRow; i >= moveToRow; i--) {
          passingSquare = i.toString() + j.toString();
          path.push(passingSquare);
          if (j <= moveToCol) j++;
        }
      }
    }
    // Check for the going down movements:
    else {
      //only goes down:
      if (moveFromCol === moveToCol) {
        for (let i = moveFromRow; i <= moveToRow; i++) {
          passingSquare = i.toString() + moveToCol.toString();
          path.push(passingSquare);
        }
        //goes down and right
      } else if (moveFromCol < moveToCol) {
        for (let i = moveFromRow; i <= moveToRow; i++) {
          passingSquare = i.toString() + j.toString();
          path.push(passingSquare);
          if (j <= moveToCol) j++;
        }
        //goes down and left
      } else {
        for (let i = moveFromRow; i <= moveToRow; i++) {
          passingSquare = i.toString() + j.toString();
          if (j >= moveToCol) j--;
        }
      }
    }
    return path;
  };

  const movePawn = (fromMove, con) => {
    console.log(mapObj[fromSquare].player);
    if (mapObj[fromSquare].player === "black") {
      // if the pawn is black or white he can go to certain direction and eat a certain way so it wont be
      // able to move backwards or eat in a forbidden way.
      if (fromMove[0] - con[0] === -1) {
        if (fromMove[1] - con[1] === 0) {
          if (!mapObj[con]) {
            return movePiece(fromSquare, con);
          }
        } else if (fromMove[1] - con[1] === 1 || fromMove[1] - con[1] === -1) {
          if (!mapObj[con]) {
            return;
          } else if (mapObj[fromSquare] !== mapObj[con]) {
            return movePiece(fromSquare, con);
          }
        }
      }
    }
    if (mapObj[fromSquare].player === "white") {
      if (fromMove[0] - con[0] === 1) {
        if (fromMove[1] - con[1] === 0) {
          if (!mapObj[con]) {
            return movePiece(fromSquare, con);
          }
        } else if (fromMove[1] - con[1] === 1 || fromMove[1] - con[1] === -1) {
          if (!mapObj[con]) {
            return;
          } else if (mapObj[fromSquare] !== mapObj[con]) {
            return movePiece(fromSquare, con);
          }
        }
      }
    }
    return console.log("nah");
  };
  const moveRook = (fromMove, con) => {
    // rook can only move straight up\down or straight left\right
    const fromToZeroIndex = fromMove[0] - con[0];
    const fromToOneIndex = fromMove[1] - con[1];

    if (fromToZeroIndex <= 7 || fromToZeroIndex >= -7) {
      if (fromToOneIndex === 0) {
        return movePiece(fromSquare, con);
      }
    }
    if (fromMove[0] - con[0] === 0) {
      if (fromToOneIndex <= 7 || fromToOneIndex >= -7) {
        return movePiece(fromSquare, con);
      }
    }
  };
  const moveKnight = (fromMove, con) => {
    // knight logic. if it moves 1 further, it means 2 to the side, if 2 further, 1 to the side.
    const fromToZeroIndex = fromMove[0] - con[0];
    const fromToOneIndex = fromMove[1] - con[1];
    if (fromToZeroIndex === 1 || fromToZeroIndex === -1) {
      if (fromToOneIndex === -2 || fromToOneIndex === 2) {
        return movePieceInvoke(fromMove, con);
      }
    } else if (fromToZeroIndex === 2 || fromToZeroIndex === -2) {
      if (fromToOneIndex === 1 || fromToOneIndex === -1) {
        return movePieceInvoke(fromMove, con);
      }
    }
  };
  const moveBishop = (fromMove, con) => {
    // bishop can only move at an angle on its same color.
    const fromToZeroIndex = fromMove[0] - con[0];
    const fromToOneIndex = fromMove[1] - con[1];
    let i = fromToZeroIndex;
    if (fromToZeroIndex === i || fromToZeroIndex === -i) {
      if (fromToOneIndex === i || fromToOneIndex === -i) {
        return movePiece(fromSquare, con);
      }
    }
  };
  const moveQueen = (fromMove, con) => {
    // can behave as any other piece apart from knight.
    const fromToZeroIndex = fromMove[0] - con[0];
    const fromToOneIndex = fromMove[1] - con[1];
    let i = fromToZeroIndex;
    if (
      fromToZeroIndex === i ||
      fromToZeroIndex === -i ||
      fromToZeroIndex === 0
    ) {
      if (
        fromToOneIndex === i ||
        fromToOneIndex === -i ||
        fromToOneIndex === 0
      ) {
        return movePiece(fromSquare, con);
      }
    }
    if (fromMove[0] - con[0] === 0) {
      if (fromToOneIndex <= 7 || fromToOneIndex >= -7) {
        return movePiece(fromSquare, con);
      }
    }
    return console.log("nah");
  };
  const moveKing = (fromMove, con) => {
    const fromToZeroIndex = fromMove[0] - con[0];
    const fromToOneIndex = fromMove[1] - con[1];

    if (
      fromToZeroIndex === 1 ||
      fromToZeroIndex === 0 ||
      fromToZeroIndex === -1
    ) {
      if (
        fromToOneIndex === 1 ||
        fromToOneIndex === 0 ||
        fromToOneIndex === -1
      ) {
        return movePiece(fromSquare, con);
      }
    }
    return console.log("nah");
  };

  const checkPath = (path) => {
    //get an path array
    for (let i = 1; i <= path.length; i++) {
      let figure = path[i];
      if (mapObj[figure]) {
        // console.log("figured");
        // console.log(mapObj[path[0]].type);
        if (mapObj[path[0]].type == "knight") {
          return true;
        }
      }
      if (mapObj[figure]) return false;
      if (i === path.length - 1) {
        if (mapObj[figure]) {
          if (mapObj[figure].player !== mapObj[figure].player) {
            return false;
          }
        }
      }
      //if last cell is empty ?
      // if the last cell is the same color as the current player
      //if the last cell is the other color

      //last cell.
    }
    return true;
    // return boolean
  };

  const movePiece = (fromSquare, toSquare) => {
    // here we will move the actual piece from one sqaure to another.
    console.log("inside move", fromSquare, toSquare);
    // 1. mapObj[toSquare] = mapObj[fromSquare] to the obj
    // 2. delete the property whose key is "fromSquare" from mapObj
    const path = getTheFigurePath(fromSquare, toSquare);
    if (!checkPath(path)) return;

    mapObj[toSquare] = mapObj[fromSquare];
    delete mapObj[fromSquare];
    setPlayer(!player);
    console.log(player);
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
    console.log(player);
    if (count === 0) {
      if (!mapObj[con]) {
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
    if (!mapObj[con] || mapObj[fromSquare].player !== mapObj[con].player) {
      getTheFigurePath(fromSquare, con);

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
    }
    setCount(0);
  };

  return (
    // we will map 8 * 8 of arrays to build our board.
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
                  // we will caculate the spread of black & white color on the board and identify each square
                  const numRow = rowIndex.toString();
                  const numSquare = squareIndex.toString();
                  const con = numRow.concat(numSquare);
                  const piece = mapObj[con];

                  return (
                    //props
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
      <h1>clock</h1>
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
