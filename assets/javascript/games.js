
// Variables and Arrays


var wordList = ["", "", "", "", "",];
var computerPick = "";
var wordsLetters = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongLetters = [];

//Game Trackers
var winCount = 0;
var lossCount = 0;
var guessesRemain = 9;

// Functions to be called upon when needed

//Begins game
function start() {
    computerPick = wordList[Math.floor(Math.random() * wordList.length)];
    wordsLetters = computerPick.split("");
    numBlanks = wordsLetters.lenght;

    //Resets
    guessesRemain = 9;
    wrongLetters = [];
    blanksAndSuccess = [];

    //Adds blanks and successes with the right number of blanks.
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccess.push("_");
    }

    // Change HTML to reflect the conditions of the round
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccess.join("  ");
    document.getElementById("guessLeft").innerHTML = guessesRemain;
    document.getElementById("wins").innerHTML = winCount;
    document.getElementById("losses").innerHTML = lossCount;

}
//Compares letter guessed to letters in pick
function compareLetters(letter) {
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (computerPick[i] == letter) {
            isLetterInWord = true;
        }
    }

    //find where the letter exists, then fills in blanksAndSuccesses array.
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
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesRemain);

    // Updates HTML to show most current stats
    document.getElementById("guessLeft").innerHTML = guessesRemain;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("wrongGuess").innerHTML = wrongLetters.join(" ");

    //Check if user wins
    if (wordsLetters.toString() == blanksAndSuccess.toString()) {
        winCount++;
        alert("YOU WIN!");

        // updates the win counter in HTML
        document.getElementById("wins").innerHTML = winCount;

        start();
    }
    //Check if user loses
    else if (guessesRemain == 0) {
        lossCount++;
        alert("YOU LOSE!");

        //updates the loss counter in HTML
        document.getElementById("losses").innerHTML = lossCount;

        start();
    }
}

// Main Process

// Initiates code for the first time
start();

// registers the users key presses
document.onkeyup = function (event) {
    var letterPicked = String.fromCharCode(event.keyCode).toLowerCase();
    compareLetters(letterPicked);
    roundFinish();

}