import React, { useState, useEffect } from "react";
import styled from "styled-components";
import App from "./App";

const SquareDiv = styled.div`
  border: ${(props) =>
    props.isHighlighted === false ? "1.2px solid black" : "1.2px solid red"};
  height: 70px;
  width: 70px;
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.piece.player === true ? "black" : "blue")};
  background-color: ${(props) => (props.color === false ? "white" : "gray")};

  &:hover {
    border: 1.2px solid red;
    background: green;
    opacity: 0.8;
  }
`;
// console.log("path path its a come", path);
const Square = ({ color, piece = {}, onClick, isHighlighted }) => {
  // console.log("77", path);
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

  //   console.log(piece.choose);
  //   console.log(colorPic);
  //   console.log(color);
  // console.log(path);
  return (
    <SquareDiv
      color={color}
      piece={piece}
      onClick={onClick}
      isHighlighted={isHighlighted}
      // onMouseOver={onMouseOver}
      style={
        {
          // color: piece.player === "white" ? "green" : "blue",
          // backgroundColor: color === "black" ? "white" : "gray",
          // height: "70px",
          // width: "70px",
          // fontSize: "45px",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }
      }
    >
      {pieceChar}
    </SquareDiv>
  );
};

export default Square;
