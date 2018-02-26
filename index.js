let Word = require("./word.js");
let inquirer = require("inquirer");
let term = require("terminal-kit").terminal;
let currentIndexState = require("./currentIndexState.js")

function Game(wordList) {
    term.red("Feel free to get a hint by typing hint in the console!!");
    console.log("")
    //Variable holding state of current Index. This is for accessing the next word
    let currentWordIndex = currentIndexState.currentIndexState.indexOfWords;
    let wordListObjects = [];
    let newWord = wordList[currentWordIndex].name;
    //creating the word object from class Word
    newWord = new Word.Word(newWord);
    wordListObjects.push(wordList[currentWordIndex]);
    //creating letter objects based off of current word
    newWord.createLetterObjects();
    function start() {
        //checks to see if it needs to go to the next word
        if (Word.nextWord === "true") {
            console.log("go to next word");
            word.newWord = "false";
        }
        if (newWord.guessLimit > 0) {
            inquirer.prompt({
                type: "input",
                message: "Guess a letter",
                name: "letterToGuess"
            }).then(function (response) {
                let letter = response.letterToGuess.toLowerCase();
                if (letter === 'hint') {
                    let index = currentIndexState.currentIndexState.indexOfWords
                    let tip = wordList[index].tip
                    console.log(tip)
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
                else if (newWord.generateGuess(response.letterToGuess)) {
                    if (currentIndexState.currentIndexState.indexOfWords >= currentIndexState.currentIndexState.wordList.length) {
                        console.log("Game over");
                        process.exit();
                    } else {
                        Game(currentIndexState.currentIndexState.wordList)
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
        }
    }
    start();
}

Game(currentIndexState.currentIndexState.wordList);


