import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Square from "./Square";
import { findMovableSquaresInDirection } from "./findMovableSquares";
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
  "00": { type: "rook", player: false },
  "01": { type: "knight", player: false },
  "02": { type: "bishop", player: false },
  "03": { type: "king", player: false },
  "04": { type: "queen", player: false },
  "05": { type: "bishop", player: false },
  "06": { type: "knight", player: false },
  "07": { type: "rook", player: false },
  "10": { type: "pawn", player: false },
  "11": { type: "pawn", player: false },
  "12": { type: "pawn", player: false },
  "13": { type: "pawn", player: false },
  "14": { type: "pawn", player: false },
  "15": { type: "pawn", player: false },
  "16": { type: "pawn", player: false },
  "17": { type: "pawn", player: false },
  "60": { type: "pawn", player: true },
  "61": { type: "pawn", player: true },
  "62": { type: "pawn", player: true },
  "63": { type: "pawn", player: true },
  "64": { type: "pawn", player: true },
  "65": { type: "pawn", player: true },
  "66": { type: "pawn", player: true },
  "67": { type: "pawn", player: true },
  "70": { type: "rook", player: true },
  "71": { type: "knight", player: true },
  "72": { type: "bishop", player: true },
  "73": { type: "king", player: true },
  "74": { type: "queen", player: true },
  "75": { type: "bishop", player: true },
  "76": { type: "knight", player: true },
  "77": { type: "rook", player: true },
};

const Board = () => {
  const [count, setCount] = useState(0);
  const [fromSquare, setFromSquare] = useState();
  const [player, setPlayer] = useState(true);
  const [check, setCheck] = useState(false);
  const [chosen, setChosen] = useState();
  // const [toSquare, setToSquare] = useState();
  // useEffect(() => {
  //   if (check === true) {
  //     console.log("check is true");
  //     setCount(0);
  //   }
  // }, 1);
  console.log(chosen);

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

  check === false ? console.log("check false") : console.log("check truth");
  // checking if theres a check in play
  const findKing = (startingSquare) => {
    // here we find the king's key (location)
    const entries = Object.entries(mapObj);
    // console.log(entries);
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

  // useState chosen
  // caculate which cells i chose and which will be on my path
  // scan through the cells and paint the chosen

  // const getTheFigurePath = (moveFrom, moveTo) => {
  //   const path = [];
  //   let passingSquare;
  //   const [moveFromRow, moveFromCol] = splitAndParseToNumber(moveFrom);
  //   const [moveToRow, moveToCol] = splitAndParseToNumber(moveTo);
  //   let j = moveFromCol;
  //   //fill the path with the squares we past
  //   //check witch is bigger , the rows move from or rows move to . if moveTo rows? then we going down, else going up
  //   //check the going up movements:TODO - SET IN A OTHER FUNCTION ?
  //   if (moveFromRow > moveToRow) {
  //     //going only up the board
  //     if (moveFromCol === moveToCol) {
  //       for (let i = moveFromRow; i >= moveToRow; i--) {
  //         passingSquare = i.toString() + moveFromCol.toString();
  //         path.push(passingSquare);
  //       }
  //     }
  //     //going up and move left
  //     else if (moveFromCol > moveToCol) {
  //       for (let i = moveFromRow; i > moveToRow; i--) {
  //         passingSquare = i.toString() + j.toString();
  //         path.push(passingSquare);
  //         if (j >= moveToCol) j--;
  //       }
  //       path.push(moveTo);
  //     }
  //     //move up and turn right
  //     else if (moveFromCol < moveToCol) {
  //       for (let i = moveFromRow; i >= moveToRow; i--) {
  //         passingSquare = i.toString() + j.toString();
  //         path.push(passingSquare);
  //         if (j <= moveToCol) j++;
  //       }
  //       path.push(moveTo);
  //     }
  //   }
  //   // Check for the going down movements:
  //   else {
  //     //only goes down:
  //     if (moveFromCol === moveToCol) {
  //       for (let i = moveFromRow; i <= moveToRow; i++) {
  //         passingSquare = i.toString() + moveToCol.toString();
  //         path.push(passingSquare);
  //       }
  //       //goes down and right
  //     } else if (moveFromCol < moveToCol) {
  //       for (let i = moveFromRow; i <= moveToRow; i++) {
  //         passingSquare = i.toString() + j.toString();
  //         path.push(passingSquare);
  //         if (j <= moveToCol) j++;
  //       }
  //       //goes down and left
  //     } else {
  //       for (let i = moveFromRow; i <= moveToRow; i++) {
  //         passingSquare = i.toString() + j.toString();
  //         if (j >= moveToCol) j--;
  //       }
  //     }
  //   }
  //   return path;
  // };

  // const movePawn = (fromMove, toMove) => {
  //   // console.log(mapObj[fromSquare].player);
  //   if (mapObj[fromSquare].player === false) {
  //     // if the pawn is black or white he can go to certain direction and eat a certain way
  //     //only the pawns first step may be two steps
  //     if (fromMove[0] - toMove[0] === -2) {
  //       //only if its the pawn first move it can go two steps
  //       if (fromMove[0] === "1") {
  //         return moveInvoke(fromSquare, toMove);
  //       }
  //     }
  //     if (fromMove[0] - toMove[0] === -1) {
  //       //normally a pawn can only go straight
  //       if (fromMove[1] - toMove[1] === 0) {
  //         if (!mapObj[toMove]) {
  //           return moveInvoke(fromSquare, toMove);
  //         }
  //       } else if (
  //         fromMove[1] - toMove[1] === 1 ||
  //         fromMove[1] - toMove[1] === -1
  //       ) {
  //         // in case of eating
  //         if (!mapObj[toMove]) {
  //           return;
  //         } else if (mapObj[fromSquare] !== mapObj[toMove]) {
  //           return moveInvoke(fromSquare, toMove);
  //         }
  //       }
  //     }
  //   }
  //   if (mapObj[fromSquare].player === true) {
  //     if (fromMove[0] - toMove[0] === 2) {
  //       //only if its the pawn first move it can go two steps
  //       if (fromMove[0] === "6") {
  //         return moveInvoke(fromSquare, toMove);
  //       }
  //     }
  //     //case of white pawn go straight
  //     if (fromMove[0] - toMove[0] === 1) {
  //       if (fromMove[1] - toMove[1] === 0) {
  //         if (!mapObj[toMove]) {
  //           return moveInvoke(fromSquare, toMove);
  //         }
  //       } else if (
  //         fromMove[1] - toMove[1] === 1 ||
  //         fromMove[1] - toMove[1] === -1
  //       ) {
  //         //in case of eating
  //         if (!mapObj[toMove]) {
  //           return;
  //         } else if (mapObj[fromSquare] !== mapObj[toMove]) {
  //           return moveInvoke(fromSquare, toMove);
  //         }
  //       }
  //     }
  //   }
  //   return console.log("nah");
  // };
  // const moveRook = (fromMove, con) => {
  //   // rook can only move straight up\down or straight left\right
  //   const fromToZeroIndex = fromMove[0] - con[0];
  //   const fromToOneIndex = fromMove[1] - con[1];

  //   if (fromToZeroIndex <= 7 || fromToZeroIndex >= -7) {
  //     if (fromToOneIndex === 0) {
  //       return moveInvoke(fromSquare, con);
  //     }
  //   }
  //   if (fromMove[0] - con[0] === 0) {
  //     if (fromToOneIndex <= 7 || fromToOneIndex >= -7) {
  //       return moveInvoke(fromSquare, con);
  //     }
  //   }
  // };
  // const moveKnight = (fromMove, con) => {
  //   // knight logic. if it moves 1 further, it means 2 to the side, if 2 further, 1 to the side.

  //   const fromToZeroIndex = fromMove[0] - con[0];
  //   const fromToOneIndex = fromMove[1] - con[1];
  //   if (fromToZeroIndex === 1 || fromToZeroIndex === -1) {
  //     if (fromToOneIndex === -2 || fromToOneIndex === 2) {
  //       return moveInvoke(fromMove, con);
  //     }
  //   } else if (fromToZeroIndex === 2 || fromToZeroIndex === -2) {
  //     if (fromToOneIndex === 1 || fromToOneIndex === -1) {
  //       return moveInvoke(fromMove, con);
  //     }
  //   }
  // };

  // const moveBishop = (fromMove, con) => {
  //   // bishop can only move at an angle on its same color.
  //   const fromToZeroIndex = fromMove[0] - con[0];
  //   const fromToOneIndex = fromMove[1] - con[1];
  //   let i = fromToZeroIndex;
  //   if (fromToZeroIndex === i || fromToZeroIndex === -i) {
  //     if (fromToOneIndex === i || fromToOneIndex === -i) {
  //       return moveInvoke(fromSquare, con);
  //     }
  //   }
  // };
  // const moveQueen = (fromMove, con) => {
  //   // can behave as any other piece apart from knight.
  //   const fromToZeroIndex = fromMove[0] - con[0];
  //   const fromToOneIndex = fromMove[1] - con[1];
  //   let i = fromToZeroIndex;
  //   if (
  //     fromToZeroIndex === i ||
  //     fromToZeroIndex === -i ||
  //     fromToZeroIndex === 0
  //   ) {
  //     if (
  //       fromToOneIndex === i ||
  //       fromToOneIndex === -i ||
  //       fromToOneIndex === 0
  //     ) {
  //       return moveInvoke(fromSquare, con);
  //     }
  //   }
  //   if (fromMove[0] - con[0] === 0) {
  //     if (fromToOneIndex <= 7 || fromToOneIndex >= -7) {
  //       return moveInvoke(fromSquare, con);
  //     }
  //   }
  //   return console.log("nah");
  // };
  // const moveKing = (fromMove, con) => {
  //   const fromToZeroIndex = fromMove[0] - con[0];
  //   const fromToOneIndex = fromMove[1] - con[1];

  //   if (
  //     fromToZeroIndex === 1 ||
  //     fromToZeroIndex === 0 ||
  //     fromToZeroIndex === -1
  //   ) {
  //     if (
  //       fromToOneIndex === 1 ||
  //       fromToOneIndex === 0 ||
  //       fromToOneIndex === -1
  //     ) {
  //       return moveInvoke(fromSquare, con);
  //     }
  //   }
  //   return console.log("nah");
  // };

  // const checkPath = (path) => {
  //   //get an path array
  //   for (let i = 1; i <= path.length; i++) {
  //     let figure = path[i];
  //     if (mapObj[figure]) {
  //       // console.log("figured");
  //       // console.log(mapObj[path[0]].type);
  //       if (mapObj[path[0]].type == "knight") {
  //         return true;
  //       }
  //     }
  //     if (mapObj[figure]) return false;
  //     if (i === path.length - 1) {
  //       if (mapObj[figure]) {
  //         if (mapObj[figure].player !== mapObj[figure].player) {
  //           return false;
  //         }
  //       }
  //     }
  //     //if last cell is empty ?
  //     // if the last cell is the same color as the current player
  //     //if the last cell is the other color

  //     //last cell.
  //   }
  //   return true;
  //   // return printCheckOutsidelean
  // };

  const movePiece = (fromSquare, toSquare) => {
    const movingContent = () => {
      // here we will move the actual piece from one sqaure to another.
      console.log("inside move", fromSquare, toSquare);
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
      console.log("player is: ", player);
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
    console.log("splitted");
    return [parseInt(row), parseInt(col)];
  };

  const addPossibleCellToPath = (
    nextPossibleRow,
    nextPossibleCol,
    nextPossibleMoves
  ) => {
    const nextPossibleCell =
      nextPossibleRow.toString() + nextPossibleCol.toString();
    // remove the options of jumping above current player figures
    // if (
    //   mapObj[nextPossibleCell] &&
    //   mapObj[nextPossibleCell].player === player
    // ) {
    //   return false;
    // }
    // add the last opponent cell, so i can remove him on play, and return to avoid the path to continue

    // if (
    //   mapObj[nextPossibleCell] &&
    //   mapObj[nextPossibleCell].player !== player
    // ) {
    //   nextPossibleMoves[nextPossibleCell] = mapObj[nextPossibleCell];
    //   return false;
    // }
    if (!mapObj[nextPossibleCell]) {
      return (nextPossibleMoves[nextPossibleCell] = "empty");
    } else
      return (nextPossibleMoves[nextPossibleCell] = mapObj[nextPossibleCell]);
  };

  const findPath = (fromSquare) => {
    let nextPossibleMoves = {};
    if (!fromSquare) {
      return {};
    } else if (!mapObj[fromSquare]) {
      return {};
    }
    const [moveFromRow, moveFromCol] = parseToNumber(fromSquare);
    let squareToCheck = "44";
    const insideMovingRook = (i, rookPath) => {
      squareToCheck = i.toString() + moveFromCol;
      console.log(typeof squareToCheck);
      let squareInsideBoard =
        squareToCheck >= 0 || squareToCheck <= 77 ? true : false;
      let isSquareEmpty = !mapObj[squareToCheck] ? true : false;
      console.log(squareInsideBoard);
      console.log(isSquareEmpty);
      if (squareInsideBoard && isSquareEmpty) {
        // if the next square is empty and inside boards then push the empty into rookPath
        console.log("inside if");
        console.log(rookPath);
        rookPath[squareToCheck] = "empty";
      } else return rookPath;
    };
    const bishopFunctionInfo = (i) => {
      addPossibleCellToPath(
        moveFromRow + i,
        moveFromCol + i,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        moveFromRow - i,
        moveFromCol - i,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        moveFromRow + i,
        moveFromCol - i,
        nextPossibleMoves
      );
      addPossibleCellToPath(
        moveFromRow - i,
        moveFromCol + i,
        nextPossibleMoves
      );
    };
    const pawnFunctionInfo = () => {
      addPossibleCellToPath(moveFromRow - 1, moveFromCol, nextPossibleMoves);
      addPossibleCellToPath(moveFromRow + 1, moveFromCol, nextPossibleMoves);
    };
    if (mapObj[fromSquare].type === "pawn") {
      const getNextPawnMove = () => {
        if (mapObj[fromSquare].player === false) {
          if (fromSquare[0] === "1") {
            addPossibleCellToPath(
              moveFromRow + 2,
              moveFromCol,
              nextPossibleMoves
            );
            addPossibleCellToPath(
              moveFromRow + 1,
              moveFromCol,
              nextPossibleMoves
            );
            return nextPossibleMoves;
          }
        }
        if (mapObj[fromSquare].player === true) {
          if (fromSquare[0] === "6") {
            addPossibleCellToPath(
              moveFromRow - 2,
              moveFromCol,
              nextPossibleMoves
            );
            addPossibleCellToPath(
              moveFromRow - 1,
              moveFromCol,
              nextPossibleMoves
            );
            return nextPossibleMoves;
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
    // if (mapObj[fromSquare].type === "knight") {
    //   const getNextKnightMove = () => {

    //     addPossibleCellToPath(
    //       moveFromRow - 2,
    //       moveFromCol + 1,
    //       nextPossibleMoves
    //     );
    //     addPossibleCellToPath(
    //       moveFromRow - 2,
    //       moveFromCol - 1,
    //       nextPossibleMoves
    //     );
    //     addPossibleCellToPath(
    //       moveFromRow + 2,
    //       moveFromCol + 1,
    //       nextPossibleMoves
    //     );
    //     addPossibleCellToPath(
    //       moveFromRow + 2,
    //       moveFromCol - 1,
    //       nextPossibleMoves
    //     );

    //     addPossibleCellToPath(
    //       moveFromRow - 1,
    //       moveFromCol + 2,
    //       nextPossibleMoves
    //     );
    //     addPossibleCellToPath(
    //       moveFromRow - 1,
    //       moveFromCol - 2,
    //       nextPossibleMoves
    //     );
    //     addPossibleCellToPath(
    //       moveFromRow + 1,
    //       moveFromCol + 2,
    //       nextPossibleMoves
    //     );
    //     addPossibleCellToPath(
    //       moveFromRow + 1,
    //       moveFromCol - 2,
    //       nextPossibleMoves
    //     );
    //     return nextPossibleMoves;
    //   };
    //   const result = getNextKnightMove(fromSquare);

    //   console.log("kkk", result);
    //   return result;
    // }
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
      // const movableSquaresRight = findMovableSquaresInDirection({
      //   startingSquare: fromSquare,
      //   getNextSquareFn: getSquareRight,
      //   mapObj,
      // });

      // all pieces movement can be defined by different "getNextSquareFn" implementations that are passed to findMovableSquaresInDirection

      // than rewrite to do it with the function and different "getNextSquareFn" implementations

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
    console.log(player);
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
      const moveFigureAlready = (fromSquare, con) => {
        if (findPath(fromSquare)[con]) {
          console.log(findPath(fromSquare)[con]);
          //check if the second click is in path
          const returnPathArr = Object.values(findPath(fromSquare));
          for (let i = 0; i <= returnPathArr.length; i++) {
            console.log("im fromsquare:", fromSquare);
            console.log("im the fucking return array:", returnPathArr);
            //scan through path and not let passing through NON-EMPTY
            if (returnPathArr[i] === "empty") {
              console.log("i survived");
              moveInvoke(fromSquare, con);
              setCount(0);
              return;
            }
            return;
          }
        }
      };
      moveFigureAlready(fromSquare, con);
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
