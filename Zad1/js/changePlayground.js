function changePlayground() {
    let ballX = document.getElementById("ballXinitialPosition").value;
    let ballY = document.getElementById("ballYinitialPosition").value;
    let y1X = document.getElementById("y1XinitialPosition").value;
    let y1Y = document.getElementById("y1YinitialPosition").value;
    let y2X = document.getElementById("y2XinitialPosition").value;
    let y2Y = document.getElementById("y2YinitialPosition").value;
    let newBoardDirection = document.getElementById("newBoardDirection").value;
    stopMoving(intervalId);
    
    let newBoard = board.map((m) =>
      m.map((n) => (n == "1" || n == "Y" ? (n = "0") : (n = n)))
    );

    newBoard[ballX][ballY] = "1";
    newBoard[y1X][y1Y] = "Y";
    newBoard[y2X][y2Y] = "Y";
  
    while (playgroundProposal?.firstChild) {
      playgroundProposal?.removeChild(playgroundProposal.firstChild);
    }
  
    newBoard.map((m, i) => {
      m.map((n, j) => {
        createBlock(i, j, n, playgroundProposal);
      });
    });
  
    board = newBoard;

    console.log(board);
    
    switch (newBoardDirection) {
      case "North-East ⇗":
        newBoardDirectionV = [-1, 1];
        break;
      case "North ⇑":
        newBoardDirectionV = [-1, 0];
        break;
      case "East ⇒":
        newBoardDirectionV = [0, 1];
        break;
      case "West ⇐":
        newBoardDirectionV = [0, -1];
        break;
      case "South ⇓":
        newBoardDirectionV = [1, 0];
        break;
      case "South-East ⇘":
        newBoardDirectionV = [1, 1];
        break;
      case "South-West ⇙":
        newBoardDirection = [1, -1];
        break;
      case "North-West ⇖":
        newBoardDirectionV = [-1, -1];
        break;
  
      default:
        break;
    }

  }