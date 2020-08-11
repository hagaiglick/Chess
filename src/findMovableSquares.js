export function findMovableSquaresInDirection({
  startingSquare,
  getNextSquareFn,
  mapObj,
}) {
  let currentlyCheckedSquare = startingSquare;
  let movableSquares = {};
  const player = mapObj[startingSquare].player;
  const isSquareInsideBoard = (square) =>
    Number(square) >= 0 && Number(square) <= 77;

  while (isSquareInsideBoard(currentlyCheckedSquare)) {
    // advance one square each iteration (note that the starting square is not a square you can move into)
    currentlyCheckedSquare = getNextSquareFn(currentlyCheckedSquare);
    const squareContent = mapObj[currentlyCheckedSquare];
    // if square is empty, add it as movable and advance one square
    if (!squareContent) {
      movableSquares[currentlyCheckedSquare] = "empty";
      let checkedSqustrToString = currentlyCheckedSquare.toString();
      if (checkedSqustrToString.length === 1) {
        console.log("is one");
        checkedSqustrToString = "0" + checkedSqustrToString;
        console.log(checkedSqustrToString);
        if (!mapObj[checkedSqustrToString]) {
          movableSquares[checkedSqustrToString] = "empty";
        }
      }
    }
    // if last square is occupied by opponent's piece, the square is movable as the piece can be taken
    else if (squareContent.player !== player) {
      movableSquares[startingSquare] = mapObj[startingSquare];
      break;
    }
    // Square is not empty, nor taken by an opponent's piece
    else {
      break;
    }
  }

  return movableSquares;
}
