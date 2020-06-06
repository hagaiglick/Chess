
moveBlackKingDown()=>moveFromRow + 1 === moveToRow && moveFromCol === moveToCol 
 
 moveBlackKingDown ()=> moveFromRow - 1 === moveToRow && moveFromCol === moveToCol


  moveKing() => moveBlackKingDown ||  moveBlackKingDown || moveBlackKingLeft || moveWhiteKingRight
0 1 2 3 4
1 1 2 3 4 
2 1 2 3 4
3
4
5
