var wordList = ["jellyfish", "shark", "octopus", "seahorse", "dolphin", "lionfish", "stingray",];
var computerPick = "";
var wordsLetters = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesRemain = 11;

function start(round) {
  
    computerPick = wordList[Math.floor(Math.random() * wordList.length)];
    wordsLetters = computerPick.split("");
    numBlanks = wordsLetters.length;

    guessesRemain = 11;
    wrongLetters = [];
    blanksAndSuccess = [];

    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccess.push("_");
    }
    
    document.getElementById("enterGuess").innerHTML = blanksAndSuccess.join("  ");
    document.getElementById("guessRemaining").innerHTML = guessesRemain;
    document.getElementById("totalWins").innerHTML = winCount;
    document.getElementById("totalLosses").innerHTML = lossCount;
}

function compareLetters(letter) {
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (computerPick[i] == letter) {
            isLetterInWord = true;
        }
    }


    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (computerPick[i] == letter) {
                blanksAndSuccess[i] = letter;
            }
        }

    }

    else {
        wrongLetters.push(letter);
        guessesRemain--
    }
}

function roundFinish() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesRemain);

    document.getElementById("guessRemaining").innerHTML = guessesRemain;
    document.getElementById("enterGuess").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("lettersGuessed").innerHTML = wrongLetters.join(" ");

    if (wordsLetters.toString() == blanksAndSuccess.toString()) {
        winCount++;
        var img = new img("");
        audio.play();
        alert("Winner, Winner, Fish Dinner!");
        document.getElementById("totalWins").innerHTML = winCount;

        start();
    }

    else if (guessesRemain == 0) {
        lossCount++;
        alert("You're Shrimp Out of Luck! Try Again!");

        document.getElementById("totalLosses").innerHTML = lossCount;
        start();
    }
}

start();

document.onkeydown = function (event) {
    var letterPicked = String.fromCharCode(event.keyCode).toLowerCase();
    compareLetters(letterPicked);
    roundFinish();
}