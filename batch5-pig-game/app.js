const currentScores = document.getElementsByClassName('player-score');
const totalScores = document.getElementsByClassName('player-current-score');
const playerPanels = document.getElementsByClassName('player-panel');

const numOfPlayers = 2;
const prefix = "player-";
var isGameOver, currentPlayer, players;

class Player {
    currentScore = 0;
    totalScore = 0;

    constructor(name, index){
        this.name = name;
        this.index = index;
        this.label = prefix + (index+1);
    }

    updateCurrentScore(diceValue) {
        if(diceValue == 1) this.currentScore = 0;
        else this.currentScore += diceValue;
        currentScores[this.index].innerHTML = this.currentScore;
    }

    updateTotalScore() {
        this.totalScore += this.currentScore;
        this.currentScore = 0;
        totalScores[this.index].innerHTML = this.totalScore;
        currentScores[this.index].innerHTML = this.currentScore;
    }
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startNewGame(){
    players = [];
    for(i = 0; i < numOfPlayers; i++) {
        players.push(new Player("player" + (i+1), i));
        currentScores[i].innerHTML = 0;
        totalScores[i].innerHTML = 0;
        playerPanels[i].classList.remove('winner');
        playerPanels[i].classList.remove('activate');
    }
    document.getElementById("gameState").style.display = "none";
    currentPlayer = players[0];
    currentPlayerIndex = 0;
    document.getElementById(currentPlayer.label + '-panel').classList.add("activate");
    isGameOver = false;
}

function rollDice() {
    if(isGameOver == false){
        let diceValue = randomNumber(1, 6);
        document.getElementById('dice').src = "./assets/dice-" + diceValue + ".png";
        currentPlayer.updateCurrentScore(diceValue);
        if(diceValue == 1) nextTurn();
    }

    else startNewGame();
}

function hold(){
    if(isGameOver == false){
        currentPlayer.updateTotalScore();
        if(currentPlayer.totalScore > 99) gameOver();
        else nextTurn();
    }

    else startNewGame();
}

function nextTurn() {
    document.getElementById(currentPlayer.label + '-panel').classList.remove("activate");
    currentPlayerIndex++;
    if(currentPlayerIndex > players.length-1) currentPlayerIndex = 0;
    currentPlayer = players[currentPlayerIndex];
    document.getElementById(currentPlayer.label + '-panel').classList.add("activate");
}

function gameOver() {
    isGameOver = true;
    document.getElementById(currentPlayer.label + '-panel').classList.add("winner");
    document.getElementById("gameState").style.display = "block";
}

startNewGame();