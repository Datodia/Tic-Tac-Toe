const buttons = document.querySelectorAll(".btn")
const home = document.getElementById('home')
const board = document.getElementById('board-sec')
const restartAlert = document.querySelector('.restart-alert')
const body = document.querySelector('body')
const cells = document.querySelectorAll('.cell')
let player = 'x'
let img = document.createElement('img')

let x = 'assets/icon-x.svg'
let o = 'assets/icon-o.svg'

let test = 'assets/icon-x.svg'


const choose = (btn) => {
    if (btn === "x") {
        buttons[0].classList.add('active')
        buttons[1].classList.remove('active')
        player = btn
    } else {
        buttons[1].classList.add('active')
        buttons[0].classList.remove('active')
        player = btn;
    }

}

const newGame = (mode) => {
    home.style.display = 'none'
    board.style.display = 'flex'
}

const quit = () => {
    restartAlert.style.display = 'flex'
    body.style.background = 'rgba(0, 0, 0, 0.88)'
}

const restart = (option) => {
    if (option === 'yes') {
        restartAlert.style.display = 'none'
        board.style.display = 'none'
        home.style.display = 'flex'
        body.style.background = 'var(--bg)'
    } else {
        restartAlert.style.display = 'none'
        body.style.background = 'var(--bg)'

    }
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => {
        if (test === 'assets/icon-x.svg') {

            cells[i].innerHTML = `<img src="${test}" />`
            test = 'assets/icon-o.svg'
        } else {

            cells[i].innerHTML = `<img src="${test}" />`
            test = 'assets/icon-x.svg'

        }
    })
}