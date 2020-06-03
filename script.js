// Faire function qui ajoute/enlève la class, créer objet, faire function qui ajoute dans l'objet les coups joués par les joueurs, puis faire condition de victoire

const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]') // RECUPERATION DE TOUTES LES CELLULES
const board = document.getElementById('board') // ON RECUPERE LE PLATEAU DE JEU
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn // VARIABLE DE CHANGEMENT DE JOUEUR

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true}) // MANIPULATION DU CLIC, UNE SEULE FOIS PAR CELLULE
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
   const cell = e.target  //RECUPERATION CELLULE CLIQUEE
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS // ON CHANGE DE JOUEUR A CHAQUE CLIC 
   placeMark(cell, currentClass)   
   if (checkWin(currentClass)) {
     endGame(false)
   } else if (isDraw()) {
       endGame(true)
   } else {
     playCount()
     swapTurns()
     setBoardHoverClass() // AFFICHE CROIX OU CERCLE AU SURVOL D'UNE CELLULE
   }                     
}

function endGame(draw) { //AFFICHE LE MESSAGE DE FIN SELON LE RESULTAT
    if (draw) {
      winningMessageTextElement.innerText = 'Egalite !'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" :
        "X"} Est le vainqueur!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) { //FONCTION QUI APPLIQUE LA CLASSE A LA CELLULE CLIQUEE
    cell.classList.add(currentClass)
}

function swapTurns() {  // FONCTION QUI CHANGE DE JOUEUR
    circleTurn = !circleTurn
}

function setBoardHoverClass(){ // AFFICHE CROIX OU CERCLE AU SURVOL D'UNE CELLULE
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
  } else {
      board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {  // ON VERIFIE LES CONDITIONS DE VICTOIRE
   return WINNING_COMBINATIONS.some(combination => {
       return combination.every(index => {
           return cellElements[index].classList.contains(currentClass)
       })
   })
}

function playCount() { // COMPTEUR DE COUPS JOUES
    let countX = document.getElementsByClassName('cell x')
    let countCircle = document.getElementsByClassName('cell circle')
    if (typeof 'cell x' || typeof 'cell circle') {
    
           count = countX.length + countCircle.length
           console.log(count)
       }
}
