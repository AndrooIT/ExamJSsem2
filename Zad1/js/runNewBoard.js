function runNewBoard() {
    while (playground.firstChild) {
      playground.removeChild(playground.firstChild);
    }
    while (playgroundProposal?.firstChild) {
      playgroundProposal?.removeChild(playgroundProposal.firstChild);
    }
    afterY = 0;
    afterX = 0;
    direction = newBoardDirectionV;
    drawBoard();
    intervalId = setInterval(() => move(), 60);
  
  }