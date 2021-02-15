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
var success = document.getElementById("success");
let circleTurn // VARIABLE DE CHANGEMENT DE JOUEUR
//const compteur = document.getElementById('compteur').innerHTML = count + "Coups joués"

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
      winningMessageTextElement.innerText = 'Egalite !';
      success.play();
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" :
        "X"} Est le vainqueur!`
        success.play();
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
       }
}

class State {
    constructor(startTimestamp, difference, suspended) {
      this.startTimestamp = startTimestamp;
      this.difference = difference;
      this.suspended = suspended;
    }
  
    static ready() {
      return new State(null, 0, 0);
    }
  }

  function play() {
    var boop = document.getElementById("boop");
    boop.play();
    

}


  
  // ICI C'EST LE TIMER ----------------------------------------------------TIMER------------------------------------------------------
  // class Stopwatch {
  //   constructor(state) {
  //     this.state = state;
  //     this.requestAnimationId = null;
  //     this.handleClickStart = this.handleClickStart.bind(this);
  //     document
  //       .getElementById("board")             //---------------------------------------------------------start---------------
  //       .addEventListener("click", this.handleClickStart);
  //     this.handleClickStop = this.handleClickStop.bind(this);
  //     document
  //       .getElementById("pause")
  //       .addEventListener("click", this.handleClickStop);
  
  //     this.handleClickReset = this.handleClickReset.bind(this);
  //     document
  //       .getElementById("restartButton")
  //       .addEventListener("click", this.handleClickReset);
  //     this.tick = this.tick.bind(this);
  //     this.render();
  //   }
  
  //   static ready() {
  //     return new Stopwatch(State.ready());
  //   }
  
  //   setState(newState) {
  //     this.state = { ...this.state, ...newState };
  //     this.render();
  //   }
  
  //   tick() {
  //     this.setState({
  //       difference: new Date(new Date() - this.state.startTimestamp)
  //     });
  //     this.requestAnimationId = requestAnimationFrame(this.tick);
  //   }
  
  //   handleClickStart() {
  //     if (this.state.startTimestamp) {
  //       // Prevent multi clicks on start
  //       return;
  //     }
  //     this.setState({
  //       startTimestamp: new Date() - this.state.suspended,
  //       suspended: 0
  //     });
  //     this.requestAnimationId = requestAnimationFrame(this.tick);
  //   }
  
  //   handleClickStop() {
  //     cancelAnimationFrame(this.requestAnimationId);
  //     this.setState({
  //       startTimestamp: null,
  //       suspended: this.state.difference
  //     });
  //   }
  
  //   handleClickReset() {
  //     cancelAnimationFrame(this.requestAnimationId);
  //     this.setState(State.ready());
  //   }
  
  //   render() {
  //     const { difference } = this.state;
  //     const hundredths = (difference
  //       ? Math.floor(difference.getMilliseconds() / 10)
  //       : 0
  //     )
  //       .toString()
  //       .padStart(2, "0");
  //     const seconds = (difference ? Math.floor(difference.getSeconds()) : 0)
  //       .toString()
  //       .padStart(2, "0");
  //     const minutes = (difference ? Math.floor(difference.getMinutes()) : 0)
  //       .toString()
  //       .padStart(2, "0");
  
  //     // Render screen
  //     document.getElementById("minutes").textContent = minutes;
  //     document.getElementById("seconds").textContent = seconds;
  //     document.getElementById("hundredths").textContent = hundredths;
  //   }
  // }
  
  // const STOPWATCH = Stopwatch.ready();

