let board = [
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '1', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', 'Y', '0', 'X'],
  ['X', '0', '0', 'X', 'X', 'X', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', 'Y', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];
// import board from './exampleInput.mjs';
const directions = [
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [0, 1],
  [0, 0],
];
const XdirectionChange = [];
let afterY = 0;
let afterX = 0;
const playground = document.getElementById("playground");
const playgroundProposal = document.getElementById("playgroundProposal");
let direction = [-1, -1];
let newBoardDirectionV=[];

function createBlock(coordinateX, coordinateY, type, pg) {
  const block = document.createElement("div");
  block.classList.add("buildingBlock");
  if (type == "Y") {
    block.classList.add("Y");
  }
  if (type == "X") {
    block.classList.add("X");
  }
  if (type == "0") {
    block.classList.add("freeflow");
  }
  if (type == "1") {
    block.classList.add("ball");
  }
  block.classList.add("coordinateX" + coordinateX);
  block.classList.add("coordinateY" + coordinateY);
  pg.appendChild(block);
}

function drawBoard() {
  board.map((m, i) => {
    m.map((n, j) => {
      createBlock(i, j, n, playground);
    });
  });
}
function move() {
  let ballPosition = document.getElementsByClassName("ball");
  let ballCoordinates = [];
  let ballNextCoordinates = [];

  let ballPositionX = ballPosition[0]
    .getAttribute("class")
    .split(" ")[2]
    .slice(11);
  let ballPositionY = ballPosition[0]
    .getAttribute("class")
    .split(" ")[3]
    .slice(11);

  ballCoordinates = [Number(ballPositionX), Number(ballPositionY)];
  ballNextCoordinates = [
    ballCoordinates[0] + direction[0],
    ballCoordinates[1] + direction[1],
  ];

  let ballNextPosition = document.getElementsByClassName(
    "coordinateX" +
      ballNextCoordinates[0] +
      " " +
      "coordinateY" +
      ballNextCoordinates[1]
  );

  let type = ballNextPosition[0].getAttribute("class").split(" ")[1];

  if (type == "freeflow") {
    if (afterY == 0 && afterX == 0) {
      ballPosition[0].classList.replace("ball", "freeflow");
      ballNextPosition[0].classList.replace("freeflow", "ball");
    }
    if (afterY == 1) {
      ballPosition[0].classList.replace("ball", "Y");
      ballNextPosition[0].classList.replace("freeflow", "ball");
      afterY = 0;
    }

    if (afterX == 1) {
      ballPosition[0].classList.replace("ball", "X");
      ballNextPosition[0].classList.replace("freeflow", "ball");
      afterX = 0;
    }
  }

  if (type == "Y") {
    ballPosition[0].classList.replace("ball", "freeflow");
    ballNextPosition[0].classList.replace("Y", "ball");
    direction = directions[Math.floor(Math.random() * 8)];
    afterY = 1;
  }

  if (type == "X") {
    if (afterX == 1) {
      ballPosition[0].classList.replace("ball", "X");
    } else {
      ballPosition[0].classList.replace("ball", "freeflow");
    }
    ballNextPosition[0].classList.replace("X", "ball");
    afterX = 1;

    switch (true) {
      // obsługa krzyża i rogów
      case direction[0] === -1 &&
        direction[1] === -1 &&
        ballPositionX == 1 &&
        ballPositionY == 1:
        direction = [1, 1];
        break;
      case direction[0] === 1 &&
        direction[1] === 1 &&
        ballPositionX == 14 &&
        ballPositionY == 10:
        direction = [-1, -1];
        break;
      case direction[0] === -1 &&
        direction[1] === 1 &&
        ballPositionX == 7 &&
        ballPositionY == 10:
        direction = [1, -1];
        break;
      case direction[0] === 1 &&
        direction[1] === -1 &&
        ballPositionX == 14 &&
        ballPositionY == 1:
        direction = [-1, 1];
        break;
      case (ballPositionX >= 8 &&
        ballPositionX <= 12 &&
        ballPositionY >= 2 &&
        ballPositionY <= 7) ||
        (ballPositionX >= 2 &&
          ballPositionX <= 6 &&
          ballPositionY >= 2 &&
          ballPositionY <= 7):
        direction = [-direction[0], -direction[1]];
        break;

      // kierunek -1,-1
      case direction[0] === -1 &&
        direction[1] === -1 &&
        ((ballPositionX == 1 && ballPositionY == 2) ||
          (ballPositionX == 7 && ballPositionY >= 9 && ballPositionY <= 11)):
        direction = [1, -1];
        break;

      case direction[0] === -1 &&
        direction[1] === -1 &&
        ballPositionX <= 15 &&
        ballPositionX >= 2 &&
        ballPositionY == 1:
        direction = [-1, 1];
        break;
      // kierunek -1,1
      case direction[0] === -1 &&
        direction[1] === 1 &&
        ballPositionX == 1 &&
        ballPositionY <= 1:
        direction = [1, 1];
        break;
      case direction[0] === -1 &&
        direction[1] === 1 &&
        ballPositionX == 7 &&
        ballPositionY >= 7 &&
        ballPositionY <= 9:
        direction = [1, 1];
        break;
      case direction[0] === -1 &&
        direction[1] === 1 &&
        ballPositionX >= 8 &&
        ballPositionX <= 15 &&
        ballPositionY == 10:
        direction = [-1, -1];
        break;
      case direction[0] === -1 &&
        direction[1] === 1 &&
        ballPositionX == 1 &&
        ballPositionY == 2:
        direction = [1, -1];
        break;
      // kierunek 1,1
      case direction[0] === 1 &&
        direction[1] === 1 &&
        ((ballPositionX == 0 && ballPositionY == 2) ||
          (ballPositionX >= 6 && ballPositionX <= 13 && ballPositionY == 10)):
        direction = [1, -1];
        break;
      case direction[0] === 1 &&
        direction[1] === 1 &&
        ballPositionX == 14 &&
        ballPositionY >= 0 &&
        ballPositionY <= 9:
        direction = [-1, 1];
        break;
      //kierunek 1,-1
      case direction[0] === 1 &&
        direction[1] === -1 &&
        ballPositionX == 14 &&
        ballPositionY >= 2 &&
        ballPositionY <= 11:
        direction = [-1, -1];
        break;
      case direction[0] === 1 &&
        direction[1] === -1 &&
        ballPositionX >= 0 &&
        ballPositionX <= 13 &&
        ballPositionY <= 2:
        direction = [1, 1];
        direction;
        break;
      //kierunki z 0
      case direction[0] === -1 && direction[1] === 0:
        direction = [1, 0];
        break;

      case direction[0] === 0 && direction[1] === -1:
        direction = [0, 1];
        break;
      case direction[0] === 0 && direction[1] === 1:
        direction = [0, -1];
        break;

      case direction[0] === 1 && direction[1] === 0:
        direction = [-1, 0];
        break;

      default:
        break;
    }
  }

}
function stopMoving(intervalId) {
  clearInterval(intervalId);
}
drawBoard();
let intervalId = setInterval(() => move(), 60);

// Create a bouncy simulator. Get board from ExampleInput.js.
// Y – when bouncing ball gets in collision with it, redirect the ball to a random direction, other that it came from. After that Y turns into 0
// X – border,
// 0 – fields, that the ball can travel through,
// 1 – bouncing ball
// The program should show how the ball travels and bounces against the walls. Bouncing objects starts in any corner. Assume that 1 and Y positions may vary.
