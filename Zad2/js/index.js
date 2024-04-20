let playground=document.getElementById('playground');
let arr= [];
for (let i = 0; i < 50; i++) {
    arr.push([]);
    for (let j = 0; j < 70; j++) {
        arr[i].push(Math.random() >= 0.7);
    }
}

function drawArr(){
    for (let i = 0; i < 50; i++){
        for (let j = 0; j < 70; j++){
            let block = document.createElement('div');
            block.classList.add("buildingBlock");
            if (arr[i][j]) {
                block.classList.add("true");
            } else {
                block.classList.add("false");
            }
            block.classList.add("coordinateX" + i);
            block.classList.add("coordinateY" + j);
            playground.appendChild(block);
        }   
    }
}

function countSurroundings(i, j) { 
    let neighbors = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;
            let neighboring_i = i + x;
            let neighboring_j = j + y;
            if (neighboring_i >= 0 && neighboring_i < 50 && neighboring_j >= 0 && neighboring_j < 70 && arr[neighboring_i][neighboring_j]) {
                neighbors++;
            }
        }
    }
    console.log(i + " " + j + " " + neighbors); 
    return neighbors;
}


function changeArr() {
    let newArr = [];
    for (let i = 0; i < 50; i++) {
        newArr.push([]);
        for (let j = 0; j < 70; j++) {
            let neighbors = countSurroundings(i, j);
            if (arr[i][j]) { // Current cell is alive
                if (neighbors < 2 || neighbors > 3) {
                    newArr[i][j] = false; // Any live cell with fewer than two live neighbors dies
                } else {
                    newArr[i][j] = true; // Any live cell with two or three live neighbors lives on
                }
            } else { // Current cell is dead
                if (neighbors === 3) {
                    newArr[i][j] = true; // Any dead cell with exactly three live neighbors becomes a live cell
                } else {
                    newArr[i][j] = false;
                }
            }
        }
    }
    arr = newArr;
    while (playground.firstChild) {
        playground.removeChild(playground.firstChild);
    }
    drawArr();
}

drawArr(); 

setInterval(()=>changeArr(), 100);

