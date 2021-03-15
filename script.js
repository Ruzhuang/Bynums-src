/*const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [1, 2, 3],
  [4, 5, 6],
  [5, 6, 7],
  [8, 9, 10],
  [9, 10, 11],
  [12, 13, 14],
  [13, 14, 15],
  [0, 4, 8],
  [4, 8, 12],
  [1, 5, 9],
  [5, 9, 13],
  [2, 6, 10],
  [6, 10, 14],
  [3, 7, 11],
  [7, 11, 15],
  [1, 6, 11],
  [0, 5, 10],
  [5, 10, 15],
  [4, 9, 14],
  [2, 5, 8],
  [3, 6, 9],
  [6, 9, 12],
  [7, 10, 13]
]
*/
const ATE = "ate"
const FOOD = "food"
var cellElements
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const choosegridElement = document.getElementById('choose-grid')
const setButton = document.getElementById('set-button')
const menuButton = document.getElementById("menu-button")
const menu = document.getElementById("menu");
const menuRestartButton = document.getElementById("restart");
const instructionButton = document.getElementById("instruction");
/*let circleTurn*/
let rightTurn
var width
var height

menuButton.addEventListener('click', pressMenuButton);
menu.addEventListener("mouseleave", closeMenu);
document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        menu.classList.remove("show");
    }
});
menuRestartButton.addEventListener('click', menuRestart);
instructionButton.addEventListener("click", showInstruction);

function menuRestart() {
    board.innerHTML = "";
    setgrid();
}

function showInstruction() {
    localStorage.setItem("forceOpen", "true");
    window.location.href = "index.html";
}

function pressMenuButton() {
    if (!menu.classList.contains("show")) {
        menu.classList.add("show");
    } else {
        menu.classList.remove("show");
    }
}

function closeMenu() {
    menu.classList.remove("show");
}

setButton.addEventListener('click', startGame)

function setgrid() {
    if (localStorage.getItem("show") != "false") {
        window.location.href = "index.html";
    } else {
        choosegridElement.classList.remove('disappear');
    }

}
/*startGame()*/

restartButton.addEventListener('click', setgrid)

function startGame() {
    var window_width = window.screen.width;

    var window_height = window.screen.height;
    height = Number(document.getElementById("height").value)
    width = Number(document.getElementById("width").value)
    if (window_height / height < window_width / width) {
        document.documentElement.style.setProperty('--cell-size', ((1 - 0.25) / height) * 100 + "vh")
    } else {
        document.documentElement.style.setProperty('--cell-size', ((1 - 0.25) / width) * 100 + "vw")
    }
    for (let i = 0; i < width * height; i++) {
        let added = document.createElement("div")
        added.className = "cell"
        added.setAttribute("data-cell", "")
        board.appendChild(added)
    }
    cellElements = document.querySelectorAll('[data-cell]')
    document.documentElement.style.setProperty('--width', width)
    choosegridElement.classList.add('disappear')
    rightTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(ATE)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
        cell.addEventListener('mouseover', handleHover)
        cell.addEventListener('mouseout', handleOut)
    })
    document.getElementById("left").classList.remove("right-turn");
    document.getElementById("right").classList.remove("right-turn");
    winningMessageElement.classList.remove('show')
}

function handleHover(e) {
    const cell = e.target;
    var i = getCellIndex(cell);
    if (rightTurn) {
        hoverRow(i);
    } else {
        hoverCol(i);
    }
    hoverSingle();
}

function hoverSingle() {
    var i = 0
    for (; i < cellElements.length; i++) {
        if (!rightTurn) {
            if (((((i) % width) + width) % width == 0 || cellElements[i - 1].classList.contains(ATE) || cellElements[i - 1].classList.contains(FOOD)) && ((((i) % width) + width) % width == width - 1 || cellElements[i + 1].classList.contains(ATE) || cellElements[i + 1].classList.contains(FOOD))) {
                cellElements[i].classList.add(FOOD)
            }
        } else {
            if ((i - width < 0 || cellElements[i - width].classList.contains(ATE) || cellElements[i - width].classList.contains(FOOD)) && (i + width > cellElements.length - 1 || cellElements[i + width].classList.contains(ATE) || cellElements[i + width].classList.contains(FOOD))) {
                cellElements[i].classList.add(FOOD)
            }
        }

    }
}

function hoverCol(i) {
    var temp = i
    while (temp < cellElements.length) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(FOOD)
        temp = temp + width
    }
    temp = i - width
    while (temp > -1) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(FOOD)
        temp = temp - width
    }
}

function hoverRow(i) {
    var temp = i
    if (temp % width == 0) {
        cellElements[temp].classList.add(FOOD)
        temp = temp + 1
    }
    while (temp % width != 0) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(FOOD)
        temp = temp + 1
    }
    if (i % width == 0) {
        return
    }
    temp = i - 1
    while (((temp % width) + width) % width != width - 1) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(FOOD)
        temp = temp - 1
    }
}

function handleOut() {
    var i = 0;
    for (; i < cellElements.length; i++) {
        cellElements[i].classList.remove(FOOD);
    }
}

function getCellIndex(elm) {
    var i = 0
    for (; i < cellElements.length; i++) {
        if (cellElements[i] == elm) {
            return i
        }
    }
}
/*
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}
*/
function handleClick(e) {
    const cell = e.target
    var i = getCellIndex(cell)
        /* change color and remove click listener on column or row*/
    if (rightTurn == true) {
        removeRow(i)
    } else {
        removeCol(i)
    }
    removeSingle()
    if (checkWin()) {
        endGame()
    } else {
        swapTurns()
    }
}

function removeSingle() {
    var i = 0
    for (; i < cellElements.length; i++) {
        if (((((i) % width) + width) % width == 0 || cellElements[i - 1].classList.contains(ATE)) && ((((i) % width) + width) % width == width - 1 || cellElements[i + 1].classList.contains(ATE))) {
            cellElements[i].classList.add(ATE)
            cellElements[i].removeEventListener('click', handleClick)
            cellElements[i].removeEventListener('mouseover', handleHover)
            cellElements[i].removeEventListener('mouseout', handleOut)
        }
        if ((i - width < 0 || cellElements[i - width].classList.contains(ATE)) && (i + width > cellElements.length - 1 || cellElements[i + width].classList.contains(ATE))) {
            cellElements[i].classList.add(ATE)
            cellElements[i].removeEventListener('click', handleClick)
            cellElements[i].removeEventListener('mouseover', handleHover)
            cellElements[i].removeEventListener('mouseout', handleOut)
        }
    }
}

function endGame() {
    board.innerHTML = ""
    winningMessageTextElement.innerText = `${rightTurn ? "RIGHT" : "LEFT"} Wins`
    winningMessageElement.classList.add('show')
}

function removeCol(i) {
    var temp = i
    while (temp < cellElements.length) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(ATE)
        cellElements[temp].removeEventListener('click', handleClick)
        cellElements[i].removeEventListener('mouseover', handleHover)
        cellElements[i].removeEventListener('mouseout', handleOut)
        temp = temp + width
    }
    temp = i - width
    while (temp > -1) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(ATE)
        cellElements[temp].removeEventListener('click', handleClick)
        cellElements[i].removeEventListener('mouseover', handleHover)
        cellElements[i].removeEventListener('mouseout', handleOut)
        temp = temp - width
    }
}

function removeRow(i) {
    var temp = i
    if (temp % width == 0) {
        cellElements[temp].classList.add(ATE)
        cellElements[temp].removeEventListener('click', handleClick)
        cellElements[i].removeEventListener('mouseover', handleHover)
        cellElements[i].removeEventListener('mouseout', handleOut)
        temp = temp + 1
    }
    while (temp % width != 0) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(ATE)
        cellElements[temp].removeEventListener('click', handleClick)
        cellElements[i].removeEventListener('mouseover', handleHover)
        cellElements[i].removeEventListener('mouseout', handleOut)
        temp = temp + 1
    }
    if (i % width == 0) {
        return
    }
    temp = i - 1
    while (((temp % width) + width) % width != width - 1) {
        if (cellElements[temp].classList.contains(ATE)) {
            break
        }
        cellElements[temp].classList.add(ATE)
        cellElements[temp].removeEventListener('click', handleClick)
        cellElements[i].removeEventListener('mouseover', handleHover)
        cellElements[i].removeEventListener('mouseout', handleOut)
        temp = temp - 1
    }
}
/*
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}*/

/*function placeMark(cell) {
  cell.classList.add(ATE)
}*/

function swapTurns() {
    rightTurn = !rightTurn
    if (rightTurn) {
        document.getElementById("left").classList.add("right-turn");
        document.getElementById("right").classList.add("right-turn");

    } else {
        document.getElementById("left").classList.remove("right-turn");
        document.getElementById("right").classList.remove("right-turn");
    }
}
/*
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}
*/
/*
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
*/
function checkWin() {
    var i = 0
    for (; i < cellElements.length; i++) {
        if (!cellElements[i].classList.contains(ATE)) {
            return false
        }
    }
    return true
}