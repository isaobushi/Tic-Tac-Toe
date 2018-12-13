

// -------------Selectors------------------------------------------

var grid = document.querySelector('.grid');
var boxes = document.querySelectorAll('.box');
var start = document.querySelector('.start')
var newGame = document.querySelector('.new-game')
var restart = document.querySelector('.restart')
var player_1 = document.querySelector('.column-left')
var player_2= document.querySelector('.column-right')
var colLeft = document.querySelector('.column-left-container')
var colRight = document.querySelector('.column-right-container')
var scoreOnScreen1 = document.querySelector('.score-two')
var scoreOnScreen2 = document.querySelector('.score-one')
var openingPage = document.querySelector('.opening-page')
var inputName1 = document.querySelector('.insertP1')
var inputName2 = document.querySelector('.insertP2')
var scoreContainerDiv = document.querySelector('.score-container')
var scorePage = document.querySelector('.score-page')
var winnerDeclar = document.querySelector('.winner-declaration')
var tireDeclaration = document.querySelector('.tie-declaration')

//-------Variable Declarations-------------------------------------
var currentPlayer = [player_1, player_2]
var scorePlayer = ['','']
var sorted;
var checkThisString;
var regSorted;
var found;
var winConditions;
var shifted;
var chooseRandomPlayer;
var select;
var reset;
var softReset;
var scoreDeclaration;
var scoreDisplay1 = 0
var scoreDisplay2 = 0
// var iPlayer;


// players click a box that stores an id, the id value is stored  as 'score' in the player accumulator

chooseRandomPlayer  = function() {
    var randomNumber = Math.floor(Math.random()*2)
    currentPlayer[randomNumber].classList.add('your-turn')
    grid.style.display = 'inline-grid'
    colLeft.style.display = 'flex'
    colRight.style.display = 'flex'
    openingPage.style.display = 'none'
    scoreContainerDiv.style.display = 'flex'
    player_1.textContent = inputName1.value
    player_2.textContent = inputName2.value
    Ai.textContent = inputName2.value
}

var selectBoxes = function(event) {
    //stores Id value of the box 
    var value = event.target.attributes.id.value;
    if ((scorePlayer[0].indexOf(value) >= 0) || (scorePlayer[1].indexOf(value) >= 0)) {//prevents double clicks on a box
        return
    }
    //checks which player is active and assignes a color of selection
    if (player_1.classList.contains('your-turn')) {
        event.target.innerHTML = '<img src="images/O.svg"alt="O"class="O">'
    }
    else {
        event.target.innerHTML = '<img src="images/X.svg"alt="X"class="x">'
    }
    //add the selected values in an accumulator and sorts it
    if (player_1.classList.contains('your-turn')){
        scorePlayer[0] = scorePlayer[0]  + value;
        sorted = Array.from(scorePlayer[0]).sort()
    }
    else {
        scorePlayer[1] = scorePlayer[1]  + value;
        sorted = Array.from(scorePlayer[1]).sort()
    }
    // if player's turns are 3 or more check for winCons, 
    if (sorted.length >= 3) {
        checkThisString = sorted.join('');
        winConditions =  [/(a|b|c).*(a|b|c).*(a|b|c).*/g,
        /(d|e|f).*(d|e|f).*(d|e|f).*/g, /(g|h|i).*(g|h|i).*(g|h|i).*/g,
        /(a|d|g).*(a|d|g).*(a|d|g).*/g, /(b|e|h).*(b|e|h).*(b|e|h).*/g,
        /(c|f|i).*(c|f|i).*(c|f|i).*/g, /(a|e|i).*(a|e|i).*(a|e|i).*/g,
        /(c|e|g).*(c|e|g).*(c|e|g).*/g]   
        winConditions.forEach(function(str){
        found = checkThisString.match(str)
    if (found !== null) {//win condition found
        if (player_1.classList.contains('your-turn')){
        scoreDisplay1 = scoreDisplay1 +1;
        scoreOnScreen1.textContent = scoreDisplay1
        scoreDeclaration()    }
        else {
            scoreDisplay2 = scoreDisplay2 +1;
        scoreOnScreen2.textContent = scoreDisplay2
        scoreDeclaration()   }
    }
    else if (sorted.length === 5) {
        scoreDeclaration()
    } 
    })
    }   //if before a player's turn 3 check just change player turn    
    if (player_1.classList.contains('your-turn')) {
        player_1.classList.remove('your-turn')
        player_2.classList.add('your-turn')
    }
    else {
        player_1.classList.add('your-turn')
        player_2.classList.remove('your-turn')
    }        
    }   

    //---------------Score Declaration and Reset function -------------------------

scoreDeclaration = function() {
    grid.style.display = 'none'
    boxes.forEach(function(box){
    box.innerHTML = ''
    })
    inputName1.style.display = 'none'
    inputName2.style.display = 'none'
    if (found !== null) {
        scorePage.style.display = 'flex'
        if (player_1.classList.contains('your-turn')) {
        winnerDeclar.textContent = inputName1.value.toUpperCase() + ' WINS!!'
            return
        }
        else {
        winnerDeclar.textContent = inputName2.value.toUpperCase() + ' WINS!!'
            return
        }
    }
    else {
    tireDeclaration.textContent = 'TIE!!!'
    scorePage.style.display = 'flex'
        return 
    }
}

reset = function() {
    grid.style.display = 'none'
    start.style.display = 'block'
    boxes.forEach(function(box){
    box.innerHTML = ''
    })
    colLeft.style.display = 'none'
    colRight.style.display = 'none'
    scorePlayer = ['','']
    openingPage.style.display = 'flex'
    inputName1.value = ''
    inputName2.value = ''
    scoreContainerDiv.style.display = 'none'
    scorePage.style.display = 'none'
    inputName1.style.display = 'inline'
    inputName2.style.display = 'inline'
    scoreDisplay1.textContent = ''
    scoreDisplay2.textContent = ''
    tireDeclaration.textContent = ''
    currentPlayer[randomNumber].classList.remove('your-turn')

    }

softReset = function() {
    grid.style.display = 'none'
    start.style.display = 'block'
    boxes.forEach(function(box){
    box.innerHTML = ''
    })
    colLeft.style.display = 'none'
    colRight.style.display = 'none'
    scorePlayer = ['','']
    openingPage.style.display = 'flex'
    scoreContainerDiv.style.display = 'none'
    scorePage.style.display = 'none'
    inputName1.style.display = 'inline'
    inputName2.style.display = 'inline'
    tireDeclaration.textContent = ''
    currentPlayer[randomNumber].classList.remove('your-turn')
    }


// ------------Buttons binding ------------------------
    boxes.forEach(function(box){
    box.addEventListener('click',selectBoxes) 
    })
    start.addEventListener('click',chooseRandomPlayer) 
    newGame.addEventListener('click',reset)
    restart.addEventListener('click',softReset)

//-----------------------------------------------------








// win conditions = ['abc','def','ghi','adg','beh','cfi','aei','ceg']

// boardSize = 3
//board = [[0,0,0],[0,0,0],[0,0,0]]
// 
// }

// iPlayer = (1.2.3)
  //i lunghezza dell'array in una riga
// for (var i = 0; i < boardSize; i++) {
//     var winner === false
//  j numero delle caselle 
//     for (var j; j < boardSize; j++) {
//         if (board[i][j] !== 1) winner = false
//     }
//     if (winner)
//         console.log('You Win' + iPlayer)
// }
// for (var i = 0; i < boardSize; i++) {
//     var winner === false
//     for (var j; j < boardSize; j++) {
//         if (board[j][i] !== 1) winner = false
//     }
//     if (winner)
//         console.log('You Win' + iPlayer)
// }
// var winner === false
// for (var i = 0; i < boardSize; i++) {
//     if (board[i][i] !== 1) winner = false
// }
// if (winner)
//     console.log('bravo P' + iPlayer)
//     var winner = false
//     for (var i = 0; i < boardSize; i++) {
//         if (board[i][boardSize - i - 1] !== 1) winner = false
//     }
//     if (winnwe)
//         console.log('You Win' + iPlayer)




//board[0][1]
// boardSize = 3
// board = []
// for (var i = 0; i < boardSize; i++) {
//     boardRow = []
//     for (var j = 0; j < boardSize; j++)
//         boardRow.push(0)
//     board.push(boardRow)