let Word = require("./word.js");
let inquirer = require("inquirer");
let term = require("terminal-kit").terminal;
let currentIndexState = require("./currentIndexState.js");

// Wordlist comes from currentIndexState.js
function Game(wordList) {
    console.log("");
    console.log("");
    term.red("Feel free to get a hint by typing hint in the console!!");
    console.log("");
    console.log("");
    // Variable holding state of current Index. This is for accessing the next word
    let currentWordIndex = currentIndexState.currentIndexState.indexOfWords;
    let wordListObjects = [];
    let newWord = wordList[currentWordIndex].name;
    // Creating the word object from class Word
    newWord = new Word.Word(newWord);
    wordListObjects.push(wordList[currentWordIndex]);
    // Creating letter objects based off of current word
    newWord.createLetterObjects();
    // Starts the game
    function start() {
        if (newWord.guessLimit > 0) {
            inquirer.prompt({
                type: "input",
                message: "Guess a letter",
                name: "letterToGuess"
            }).then(function (response) {
                let letter = response.letterToGuess.toLowerCase();
                if (letter === 'hint') {
                    let index = currentIndexState.currentIndexState.indexOfWords;
                    let tip = wordList[index].tip;
                    console.log("");
                    console.log("");
                    term.red(tip);
                    console.log("");
                    console.log("");
                    start();
                } else if (letter.length > 1 && letter !== "hint") {
                    console.log("**************************");
                    console.log("**************************");
                    term.bell.green("HEY, JUST ONE LETTER PLEASE! That's gonna cost you");
                    console.log("");
                    newWord.guessLimit = newWord.guessLimit - 1;
                    console.log("  ¯\_(ツ)_/¯")
                    console.log("**************************");
                    console.log("**************************");
                    newWord.generateGuess(response.letterToGuess);
                    start();
                } else if (!isNaN(letter) && newWord.guessLimit > 0) {
                    console.log("**************************");
                    console.log("**************************");
                    term.red("HEY NO NUMBERS!!! That's gonna cost you 2 points");
                    console.log("");
                    newWord.guessLimit = newWord.guessLimit - 1;
                    console.log("   ¯\_(ツ)_/¯")
                    newWord.generateGuess(response.letterToGuess);
                    start();
                }
                // Checks to see if this function returns true. If so, word index is increased(through word.js)
                else if (newWord.generateGuess(response.letterToGuess)) {
                    if (currentIndexState.currentIndexState.indexOfWords >= currentIndexState.currentIndexState.wordList.length) {
                        console.log("Game over");
                        inquirer.prompt([
                            {
                                type: "confirm",
                                name: "confirm",
                                message: "Want to play again?"
                            }
                        ]).then(function (result) {
                            if (result.confirm) {
                                currentIndexState.currentIndexState.indexOfWords = 0;
                                Game(currentIndexState.currentIndexState.wordList);
                            } else {
                                console.log("Ok, fine. Play later!")
                            }
                        })
                    } else {
                        // Function starts a new game with a new word
                        Game(currentIndexState.currentIndexState.wordList);
                    }

                } else {
                    start();
                }

            })

        } else {
            console.log("");
            console.log("");
            console.log("  x x");
            console.log("   .  ");
            console.log(' -----');
            console.log("Sorry, you died");
            console.log("");
            console.log("");
            console.log("**************************");
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Want to play again?"
                }
            ]).then(function (result) {
                if (result.confirm) {
                    currentIndexState.currentIndexState.indexOfWords = 0;
                    Game(currentIndexState.currentIndexState.wordList);
                } else {
                    console.log("Ok, fine. Play later!")
                }
            })
        }
    }
    start();
}

Game(currentIndexState.currentIndexState.wordList);


