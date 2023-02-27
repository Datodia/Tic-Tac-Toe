const gameBoard = document.getElementById("gameBoard");
const gameMenu = document.getElementById("gameMenu");
let X_pattern = [];
let O_pattern = [];
const winnerMark = document.getElementById("winner-mark");
let turn = document.getElementById("turn");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const cpuBtn = document.getElementById("cpuBtn");
const playerBtn = document.getElementById("playerBtn");
const XradioBtn = document.getElementById("X-mark");
const OradioBtn = document.getElementById("O-mark");
const winnerX = false;
const winnerO = false;
const boxes = document.querySelectorAll('.box')
const modal = document.getElementById("modal");
const endGame = document.getElementById("endGameModal");
const restartingGame = document.getElementById("restartGame");
const winnerTakes = document.getElementById("winnerTakes");
const winnerName = document.getElementById("winnerName");
const Xscore = document.getElementById("Xscore");
const drawScore = document.getElementById("draw");
const Oscore = document.getElementById("Oscore");
let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let player;
let cpu;

const win_pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function newGamePlayer() {
    gameBoard.style.display = "initial";
    gameMenu.style.display = "none";
    player1Name.innerHTML = "X (P1)";
    player2Name.innerHTML = "0 (P2)";
    playerBtn.setAttribute("data-value", "active");
    cpuBtn.setAttribute("data-value", "");
}

function newGameCPU() {
    gameBoard.style.display = "initial";
    gameMenu.style.display = "none";
    if (XradioBtn.checked === true) {
        player = "X";
        cpu = "O";
        player1Name.innerHTML = "X (You)";
        player2Name.innerHTML = "0 (CPU)";
    } else {
        player = "O";
        cpu = "X";
        player1Name.innerHTML = "X (CPU)";
        player2Name.innerHTML = "0 (You)";
    }
    cpuBtn.setAttribute("data-value", "active");
    playerBtn.setAttribute("data-value", "");

    cpuTurn();
}

function restartGame() {
    window.location.reload();
}

function hitBox(box) {
    var boxChoice = document.getElementById(box);
    var img = document.createElement("img");

    if (turn.getAttribute("data-value") === "X") {
        img.src = "./assets/icon-x.svg";
        img.setAttribute("class", "boxPlayed");
        boxChoice.appendChild(img);
        boxChoice.classList.remove("hoverClassX");
        boxChoice.setAttribute("data-value", "X");
        boxChoice.setAttribute("onclick", "");
        turn.setAttribute("data-value", "O");
        turn.src = "./assets/icon-o-turn.svg";
        X_pattern.push(parseInt(boxChoice.id, 10));
        X_pattern.sort();
        if (XradioBtn.checked === true) {
            origBoard.splice(
                parseInt(boxChoice.id, 10),
                1,
                (parseInt(boxChoice.id, 10), player)
            );
        } else {
            origBoard.splice(
                parseInt(boxChoice.id, 10),
                1,
                (parseInt(boxChoice.id, 10), cpu)
            );
        }
        for (empty of boxes) {
            if (empty.getAttribute("data-value") === "") {
                empty.classList.add("hoverClassO");
                empty.classList.remove("hoverClassX");
            }
        }
        checkWin(X_pattern);
    } else {
        img.src = "./assets/icon-o.svg";
        img.setAttribute("class", "boxPlayed");
        boxChoice.appendChild(img);
        boxChoice.classList.remove("hoverClassO");
        boxChoice.setAttribute("data-value", "O");
        boxChoice.setAttribute("onclick", "");
        turn.setAttribute("data-value", "X");
        turn.src = "./assets/icon-x-turn.svg";
        O_pattern.push(parseInt(boxChoice.id, 10));
        O_pattern.sort();
        if (OradioBtn.checked === true) {
            origBoard.splice(
                parseInt(boxChoice.id, 10),
                1,
                (parseInt(boxChoice.id, 10), player)
            );
        } else {
            origBoard.splice(
                parseInt(boxChoice.id, 10),
                1,
                (parseInt(boxChoice.id, 10), cpu)
            );
        }
        for (empty of boxes) {
            if (empty.getAttribute("data-value") === "") {
                empty.classList.add("hoverClassX");
                empty.classList.remove("hoverClassO");
            }
        }
        checkWin(O_pattern);
    }

    if (cpuBtn.getAttribute("data-value") === "active") {
        cpuTurn();
    }
}

var isThereWinner = false;

function checkWin(currentPlayer) {
    for (some of win_pattern) {
        const isContainedIn = (a, b) => {
            for (const v of new Set(a)) {
                if (!b.some((e) => e === v)) return false;
            }
            for (empty of boxes) {
                if (empty.getAttribute("data-value") === "") {
                    empty.classList.remove("hoverClassX");
                    empty.classList.remove("hoverClassO");
                    empty.setAttribute("onclick", "");
                }
            }
            isThereWinner = true;
            results();
            return true;
        };
        isContainedIn(some, currentPlayer);
    }

    if (
        isThereWinner === false &&
        X_pattern.length === 5 &&
        O_pattern.length === 4
    ) {
        for (all of boxes) {
            all.classList.remove("hoverClassO");
            all.classList.remove("hoverClassX");
            all.setAttribute("onclick", "");
        }
        draw();
    }
}

async function cpuTurn() {
    if (XradioBtn.checked === true) {
        const promise = new Promise((resolve, reject) => {
            if (turn.getAttribute("data-value") === "O") {
                boxes.forEach(box => {
                    box.setAttribute('onclick', "")
                });
                resolve();
            }
            if (winnerX === true) {
                reject();
            }
        });
        await promise;

        cpuPlay()
    }

    if (OradioBtn.checked === true) {
        const promise = new Promise((resolve) => {
            if (turn.getAttribute("data-value") === "X") {
                boxes.forEach(box => {
                    box.setAttribute('onclick', "")
                });
                resolve();
            }
            if (winnerO === true) {
                reject();
            }
        });
        await promise;
        cpuPlay()
    }
}

function printLetterByLetter(destination, message, speed) {
    var i = 0;
    var interval = setInterval(function () {
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i > message.length) {
            clearInterval(interval);
        }
    }, speed);
    document.getElementById(destination).innerHTML = "";
}


function bestSpot() {
    return minimax(origBoard, cpu).index;
}

function cpuPlay() {
    hitBox(bestSpot());

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].setAttribute("onclick", `hitBox('${i}')`);
    }
}

function results() {
    modal.style.display = "initial";
    endGame.style.display = "flex";
    restartingGame.style.display = "none";

    if (turn.getAttribute("data-value") === "O") {
        winnerName.style.display = "initial";

        if (playerBtn.getAttribute("data-value") === "active") {
            if (XradioBtn.checked === true) {
                winnerName.innerHTML = "Player 1 wins!";
            }
            if (OradioBtn.checked === true) {
                winnerName.innerHTML = "Player 1 wins!";
            }
        }
        if (cpuBtn.getAttribute("data-value") === "active") {
            if (XradioBtn.checked === true) {
                winnerName.innerHTML = "You won!";
            }
            if (OradioBtn.checked === true) {
                winnerName.innerHTML = "Oh no, you lost...";
            }
        }

        winnerMark.src = "./assets/icon-x.svg";
        winnerMark.style.display = "initial";
        winnerTakes.style = "color: hsl( var(--clr-lightBlue) );";
        winnerTakes.innerHTML = "takes the round";
        Xscore.innerHTML++;
        winnerX = true;
    } else {
        winnerName.style.display = "initial";
        if (playerBtn.getAttribute("data-value") === "active") {
            if (OradioBtn.checked === true) {
                winnerName.innerHTML = "Player 2 wins!";
            }
            if (XradioBtn.checked === true) {
                winnerName.innerHTML = "Player 2 wins!";
            }
        }
        if (cpuBtn.getAttribute("data-value") === "active") {
            if (OradioBtn.checked === true) {
                winnerName.innerHTML = "You won!";
            }
            if (XradioBtn.checked === true) {
                winnerName.innerHTML = "Oh no, you lost...";
            }
        }
        winnerMark.src = "./assets/icon-o.svg";
        winnerMark.style.display = "initial";
        winnerTakes.style = "color: hsl( var(--clr-orange) );";
        winnerTakes.innerHTML = "takes the round";
        Oscore.innerHTML++;
        winnerO = true;
    }
}

function draw() {
    modal.style.display = "initial";
    endGame.style.display = "flex";
    restartingGame.style.display = "none";
    winnerMark.style.display = "none";
    winnerTakes.innerHTML = "round tied";
    winnerTakes.style = "color: hsl( var(--clr-silver) );";
    winnerName.style.display = "none";
    drawScore.innerHTML++;
}

function nextRound() {
    var boxPlayed = document.querySelectorAll(".boxPlayed");

    modal.style.display = "none";
    endGame.style.display = "none";
    restartingGame.style.display = "none";
    for (all of boxPlayed) {
        all.parentNode.removeChild(all);
    }

    for (all of boxes) {
        all.setAttribute("data-value", "");
        all.classList.add("hoverClassX");
    }
    turn.setAttribute("data-value", "X");
    turn.src = "./assets/icon-x-turn.svg";
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].setAttribute("onclick", `hitBox('${i}')`);
    }
    X_pattern = [];
    O_pattern = [];
    origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    cpuTurn();
}

function displayModalRestart() {
    modal.style.display = "initial";
    endGame.style.display = "none";
    restartingGame.style.display = "flex";
}

function cancelReset() {
    modal.style.display = "none";
    checkWin(O_pattern);
    checkWin(X_pattern);
}


function emptySquares() {
    return origBoard.filter((s) => typeof s == "number");
}

function checkWinner(board, player) {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    let gameWon = null;
    for (let [index, win] of win_pattern.entries()) {
        if (win.every((elem) => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function minimax(newBoard, player) {
    var availSpots = emptySquares();

    if (checkWinner(newBoard, player)) {
        return { score: -10 };
    } else if (checkWinner(newBoard, cpu)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == cpu) {
            var result = minimax(newBoard, player);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, cpu);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === cpu) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}