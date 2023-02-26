const gameBoard = document.getElementById("gameBoard");
const gameMenu = document.getElementById("gameMenu");
let X_pattern = [];
let O_pattern = [];
const winnerMark = document.getElementById("winner-mark");
let turn = document.getElementById("turn");
let allBox = document.querySelectorAll(".box");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const cpuBtn = document.getElementById("cpuBtn");
const playerBtn = document.getElementById("playerBtn");
const XradioBtn = document.getElementById("X-mark");
const OradioBtn = document.getElementById("O-mark");
const winnerX = false;
const winnerO = false;
const box0 = document.getElementById("0");
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");

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
        for (empty of allBox) {
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
        for (empty of allBox) {
            if (empty.getAttribute("data-value") === "") {
                empty.classList.add("hoverClassX");
                empty.classList.remove("hoverClassO");
            }
        }
        checkWin(O_pattern);
    }


}

var isThereWinner = false;

function checkWin(currentPlayer) {
    for (some of win_pattern) {
        const isContainedIn = (a, b) => {
            for (const v of new Set(a)) {
                if (!b.some((e) => e === v)) return false;
            }
            for (empty of allBox) {
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
        for (all of allBox) {
            all.classList.remove("hoverClassO");
            all.classList.remove("hoverClassX");
            all.setAttribute("onclick", "");
        }
        draw();
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




const modal = document.getElementById("modal");
const endGame = document.getElementById("endGameModal");
const restartingGame = document.getElementById("restartGame");
const winnerTakes = document.getElementById("winnerTakes");
const winnerName = document.getElementById("winnerName");
const Xscore = document.getElementById("Xscore");
const drawScore = document.getElementById("draw");
const Oscore = document.getElementById("Oscore");

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

    for (all of allBox) {
        all.setAttribute("data-value", "");
        all.classList.add("hoverClassX");
    }
    turn.setAttribute("data-value", "X");
    turn.src = "./assets/icon-x-turn.svg";
    box0.setAttribute("onclick", "hitBox('0')");
    box1.setAttribute("onclick", "hitBox('1')");
    box2.setAttribute("onclick", "hitBox('2')");
    box3.setAttribute("onclick", "hitBox('3')");
    box4.setAttribute("onclick", "hitBox('4')");
    box5.setAttribute("onclick", "hitBox('5')");
    box6.setAttribute("onclick", "hitBox('6')");
    box7.setAttribute("onclick", "hitBox('7')");
    box8.setAttribute("onclick", "hitBox('8')");
    X_pattern = [];
    O_pattern = [];
    origBoard = Array.from(Array(9).keys());

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

