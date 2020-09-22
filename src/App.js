import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Square from "./Square";
import { findMovableSquaresInDirection } from "./findMovableSquares";

const mapObj = {
  //database of the board
  "00": { type: "rook", player: false },
  "01": { type: "knight", player: false },
  "02": { type: "bishop", player: false },
  "03": { type: "king", player: false },
  "04": { type: "queen", player: false },
  "05": { type: "bishop", player: false },
  "06": { type: "knight", player: false },
  "07": { type: "rook", player: false },
  10: { type: "pawn", player: false },
  11: { type: "pawn", player: false },
  12: { type: "pawn", player: false },
  13: { type: "pawn", player: false },
  14: { type: "pawn", player: false },
  15: { type: "pawn", player: false },
  16: { type: "pawn", player: false },
  17: { type: "pawn", player: false },
  60: { type: "pawn", player: true },
  61: { type: "pawn", player: true },
  62: { type: "pawn", player: true },
  63: { type: "pawn", player: true },
  64: { type: "pawn", player: true },
  65: { type: "pawn", player: true },
  66: { type: "pawn", player: true },
  67: { type: "pawn", player: true },
  70: { type: "rook", player: true },
  71: { type: "knight", player: true },
  72: { type: "bishop", player: true },
  73: { type: "king", player: true },
  74: { type: "queen", player: true },
  75: { type: "bishop", player: true },
  76: { type: "knight", player: true },
  77: { type: "rook", player: true },
};

const Board = () => {
  const [count, setCount] = useState(0);
  const [fromSquare, setFromSquare] = useState();
  const [player, setPlayer] = useState(true);
  const [check, setCheck] = useState(false);
  const [chosen, setChosen] = useState();

  let printCheckOutside;
  let printPlayerOutside;
  const printCheck = (check) => {
    check === false
      ? (printCheckOutside = "no check at this point")
      : (printCheckOutside = "check, please protect your King");
  };
  const printPlayer = (player) => {
    player === true
      ? (printPlayerOutside = "white player's turn")
      : (printPlayerOutside = "blue player's turn");
  };
  printCheck(check);
  printPlayer(player);
  const moveInvoke = (moveFrom, moveTo) => {
    // the actual movePiece
    movePiece(moveFrom, moveTo);
  };

  // checking if theres a check in play
  const findKing = (startingSquare) => {
    // here we find the king's key (location)
    const entries = Object.entries(mapObj);
    for (let i = 0; i <= entries.length - 1; i++) {
      let kingIndex;
      if (entries[i][1].type === "king") {
        if (entries[i][1].player !== mapObj[startingSquare].player) {
          kingIndex = entries[i][0];
          console.log("insideFindKing:", kingIndex);
          return kingIndex;
        }
      }
    }
  };

  const movePiece = (fromSquare, toSquare) => {
    const movingContent = () => {
      // here we will move the actual piece from one sqaure to another.

      // 1. mapObj[toSquare] = mapObj[fromSquare] to the obj
      // 2. delete the property whose key is "fromSquare" from mapObj
      // const path = getTheFigurePath(fromSquare, toSquare);
      if (check === true) {
        return;
      }
      // if (!checkPath(path)) return;
      mapObj[toSquare] = mapObj[fromSquare];
      delete mapObj[fromSquare];
      setPlayer(!player);
    };
    if (player === true) {
      if (mapObj[fromSquare].player === true) {
        movingContent();
      }
    } else if (player === false) {
      if (mapObj[fromSquare].player === false) {
        movingContent();
      }
    }
  };
  // useEffect(() => {
  //   console.log("inEffect", fromSquare, toSquare);
  //   if (fromSquare && toSquare) {
  //     movePiece(fromSquare, toSquare);
  //     // setToSquare();
  //   }
  // }, [fromSquare, toSquare]);

  const parseToNumber = (square) => {
    const [row, col] = square.split("");
    return [parseInt(row), parseInt(col)];
  };

  const addPossibleCellToPath = (
    fromSquare,
    nextPossibleRow,
    nextPossibleCol,
    nextPossibleMoves
  ) => {
    const nextPossibleCell =
      nextPossibleRow.toString() + nextPossibleCol.toString();

    if (!mapObj[nextPossibleCell]) {
      return (nextPossibleMoves[nextPossibleCell] = "empty");
    } else if (mapObj[nextPossibleCell].player !== mapObj[fromSquare].player) {
      return (nextPossibleMoves[nextPossibleCell] = "eat");
    } else return {};
  };

  const findPath = (fromSquare) => {
    let nextPossibleMoves = {};
    if (!fromSquare) {
      return {};
    } else if (!mapObj[fromSquare]) {
      return {};
    }
    const [moveFromRow, moveFromCol] = parseToNumber(fromSquare);
    const bishopFunctionInfo = (i) => {
      addPossibleCellToPath(
        fromSquare,
        moveFromRow + i,
        moveFromCol + i,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        fromSquare,
        moveFromRow - i,
        moveFromCol - i,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        fromSquare,
        moveFromRow + i,
        moveFromCol - i,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        fromSquare,
        moveFromRow - i,
        moveFromCol + i,
        nextPossibleMoves
      );
    };
    const pawnFunctionInfo = () => {
      addPossibleCellToPath(
        fromSquare,
        moveFromRow - 1,
        moveFromCol,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        fromSquare,
        moveFromRow + 1,
        moveFromCol,
        nextPossibleMoves
      );
    };
    if (mapObj[fromSquare].type === "pawn") {
      const fromSquareToNum = Number(fromSquare);
      const getNextPawnMove = () => {
        if (mapObj[fromSquare].player === false) {
          if (fromSquare[0] === "1") {
            //if its first move, pawn can move 2 squares
            addPossibleCellToPath(
              fromSquare,
              moveFromRow + 2,
              moveFromCol,
              nextPossibleMoves
            );
            addPossibleCellToPath(
              fromSquare,
              moveFromRow + 1,
              moveFromCol,
              nextPossibleMoves
            );
            return nextPossibleMoves;
          }
          if (mapObj[(fromSquareToNum + 11).toString()]) {
            //check if the pawn my eat
            if (
              mapObj[(fromSquareToNum + 11).toString()].player !==
              mapObj[fromSquare].player
            ) {
              addPossibleCellToPath(
                fromSquare,
                moveFromRow + 1,
                moveFromCol + 1,
                nextPossibleMoves
              );
            }
          }
        }
        addPossibleCellToPath(
          fromSquare,
          moveFromRow + 1,
          moveFromCol,
          nextPossibleMoves
        );
        console.log(nextPossibleMoves);
        if (mapObj[fromSquare].player === true) {
          if (fromSquare[0] === "6") {
            //if its first move, pawn can move 2 squares
            addPossibleCellToPath(
              fromSquare,
              moveFromRow - 2,
              moveFromCol,
              nextPossibleMoves
            );
            addPossibleCellToPath(
              fromSquare,
              moveFromRow - 1,
              moveFromCol,
              nextPossibleMoves
            );
            return nextPossibleMoves;
          }
          addPossibleCellToPath(
            fromSquare,
            moveFromRow - 1,
            moveFromCol,
            nextPossibleMoves
          );
          if (mapObj[(fromSquareToNum - 11).toString()]) {
            //check if the pawn may eat
            if (
              mapObj[(fromSquareToNum - 11).toString()].player !==
              mapObj[fromSquare].player
            ) {
              addPossibleCellToPath(
                fromSquare,
                moveFromRow - 1,
                moveFromCol - 1,
                nextPossibleMoves
              );
            }
          }
        }
        pawnFunctionInfo();
        return nextPossibleMoves;
      };
      const result = getNextPawnMove(fromSquare);

      console.log("kkk", result);
      return result;
    }
    // console.log(fromSquare, mapObj);
    if (mapObj[fromSquare].type === "knight") {
      const getNextKnightMove = () => {
        addPossibleCellToPath(
          fromSquare,
          moveFromRow - 2,
          moveFromCol + 1,
          nextPossibleMoves
        );
        addPossibleCellToPath(
          fromSquare,
          moveFromRow - 2,
          moveFromCol - 1,
          nextPossibleMoves
        );
        addPossibleCellToPath(
          fromSquare,
          moveFromRow + 2,
          moveFromCol + 1,
          nextPossibleMoves
        );
        addPossibleCellToPath(
          fromSquare,
          moveFromRow + 2,
          moveFromCol - 1,
          nextPossibleMoves
        );

        addPossibleCellToPath(
          fromSquare,
          moveFromRow - 1,
          moveFromCol + 2,
          nextPossibleMoves
        );
        addPossibleCellToPath(
          fromSquare,
          moveFromRow - 1,
          moveFromCol - 2,
          nextPossibleMoves
        );
        addPossibleCellToPath(
          fromSquare,
          moveFromRow + 1,
          moveFromCol + 2,
          nextPossibleMoves
        );
        addPossibleCellToPath(
          fromSquare,
          moveFromRow + 1,
          moveFromCol - 2,
          nextPossibleMoves
        );
        return nextPossibleMoves;
      };
      const result = getNextKnightMove(fromSquare);

      console.log("kkk", result);
      return result;
    }
    if (mapObj[fromSquare].type === "rook") {
      console.log("rooked");

      // get's the square (index) of the square above the given  index
      const getSquareAbove = (square) => {
        //getting the string square and return the next square going up as a number
        const squareNum = Number(square);
        return squareNum - 10;
      };
      const getSquareDown = (square) => {
        //getting the string square and return the next square going down as a number
        const squareNum = Number(square);
        return squareNum + 10;
      };
      const getSquareLeft = (square) => {
        //getting the string square and return the next square going left as a number
        const squareNum = Number(square);
        return squareNum - 1;
      };
      // const getSquareRight = (square) => {
      //   //getting the string square and return the next square going right as a number
      //   const squareNum = Number(square);
      //   return squareNum + 1;
      // };
      const movableSquaresAbove = findMovableSquaresInDirection({
        startingSquare: fromSquare,
        getNextSquareFn: getSquareAbove,
        mapObj,
      });
      const movableSquaresDown = findMovableSquaresInDirection({
        startingSquare: fromSquare,
        getNextSquareFn: getSquareDown,
        mapObj,
      });
      const movableSquaresLeft = findMovableSquaresInDirection({
        startingSquare: fromSquare,
        getNextSquareFn: getSquareLeft,
        mapObj,
      });

      console.log("kkk", movableSquaresAbove);
      console.log("kkk", movableSquaresDown);
      return {
        ...movableSquaresAbove,
        ...movableSquaresDown,
        ...movableSquaresLeft,
      };
    }
  };
  const handleClick = (con) => {
    if (count === 0) {
      if (!mapObj[con]) {
        //first spuare to click cant be empty
        return;
      }
    }
    if (count === 0) {
      setFromSquare(con);
      setCount(count + 1);
      console.log("this con mada", con);
      setChosen(con);
      console.log("chosen:", chosen);
      return;
    }
    //second click
    // fromSquare -> toSqaure
    if (!mapObj[con] || mapObj[fromSquare].player !== mapObj[con].player) {
      // check if the square we move to is empty or filled with the other player
      const moveFigureFromSquareToSquare = (fromSquare, con) => {
        // console.log("out here checkin", fromSquare, con);
        if (findPath(fromSquare)[con]) {
          //check if the second click is in path => can move
          const returnPathArr = Object.values(findPath(fromSquare));
          for (let i = 0; i <= returnPathArr.length; i++) {
            // console.log("im fromsquare:", fromSquare);
            // console.log("im the fucking return array:", returnPathArr);
            //scan through path and not let passing through NON-EMPTY
            if (returnPathArr[i] === "empty" || returnPathArr[i] === "eat") {
              // if the square is empty or eatable you may move
              // console.log("i survived");
              moveInvoke(fromSquare, con);
              setCount(0);
              return;
            }
            return;
          }
        }
      };
      moveFigureFromSquareToSquare(fromSquare, con);
    }
    setCount(0);
  };

  console.log(chosen);
  const path = findPath(chosen);
  console.log(path);

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
                    (squareIndex + rowIndex) % 2 === 0 ? true : false;
                  // we will caculate the spread of black & white color on the board and identify each square
                  const numRow = rowIndex.toString();
                  const numSquare = squareIndex.toString();
                  const con = numRow.concat(numSquare);
                  const piece = mapObj[con];
                  const isHighlighted = path[con] ? true : false;
                  console.log(isHighlighted);
                  return (
                    //props
                    <Square
                      isHighlighted={isHighlighted}
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
      <h1>{printCheckOutside}</h1>
      <h1>{printPlayerOutside}</h1>
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
// if (mapObj[fromSquare].type === "bishop") {
//   const getNextBishopMove = () => {
//     for (let i = fromSquare[0]; i <= 7; i++) {
//       bishopFunctionInfo(i);
//     }
//     for (let i = fromSquare[0]; i >= 0; i--) {
//       bishopFunctionInfo(i);
//     }
//     return nextPossibleMoves;
//   };
//   const result = getNextBishopMove(fromSquare);

//   console.log("kkk", result);
//   return result;
// }
// if (mapObj[fromSquare].type === "queen") {
//   const getNextQueenMove = () => {
//     for (let i = 1; i <= 7; i++) {
//       bishopFunctionInfo(i);
//       rookFunctionInfo(i);
//     }
//     return nextPossibleMoves;
//   };
//   const result = getNextQueenMove(fromSquare);

//   console.log("kkk", result);
//   return result;
// }
// if (mapObj[fromSquare].type === "king") {
//   const getNextKingMove = () => {
//     pawnFunctionInfo();
//     addPossibleCellToPath(
//       moveFromRow + 1,
//       moveFromCol - 1,
//       nextPossibleMoves
//     );
//     addPossibleCellToPath(
//       moveFromRow + 1,
//       moveFromCol + 1,
//       nextPossibleMoves
//     );
//     addPossibleCellToPath(moveFromRow, moveFromCol - 1, nextPossibleMoves);
//     addPossibleCellToPath(moveFromRow, moveFromCol + 1, nextPossibleMoves);
//     addPossibleCellToPath(
//       moveFromRow - 1,
//       moveFromCol - 1,
//       nextPossibleMoves
//     );
//     addPossibleCellToPath(
//       moveFromRow - 1,
//       moveFromCol + 1,
//       nextPossibleMoves
//     );
//     return nextPossibleMoves;
//   };
//   const result = getNextKingMove(fromSquare);

//   console.log("kkk", result);
//   return result;
// }
