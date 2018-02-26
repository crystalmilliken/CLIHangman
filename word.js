let Letter = require("./letter.js");
let term = require("terminal-kit").terminal;
let currentIndexState = require("./currentIndexState.js");
let startGame = require("./index.js");

function Word(currentWord) {
    this.nextWord = false;
    this.guessLimit = 6;
    this.currentWord = currentWord;
    this.resultLetters = [];
    this.stringOfLetterObjects = [];
    this.createLetterObjects = function () {
        this.currentWord = currentWord.split("");
        this.currentWord.map((x) => {
            x = new Letter.Letter(x);
            this.stringOfLetterObjects.push(x);
            this.resultLetters.push(x.returnChar());
        });
        term.bold.magenta(this.resultLetters.join().replace(/,/g, " "));
    }
    this.generateGuess = function (guess) {
        if (currentWord.indexOf(guess) === -1) {
            this.guessLimit = this.guessLimit - 1;
            console.log("**************************");
            console.log("**************************");
            console.log("");
            term.bold.yellow("WRONG!!!");
            console.log("");
            term.brightRed.italic(`Guesses left: ${this.guessLimit}`)
            console.log("");
            console.log("");
            console.log("**************************");
            console.log("**************************");
            console.log("");
        } else {
            currentWord.indexOf(guess)
            console.log("**************************");
            console.log("**************************");
            console.log("");
            term.bold.green("CORRECT!!!")
            console.log("");
            console.log("");
            console.log("**************************");
            console.log("**************************");
            console.log("");
        }
        //Need to do an already guessed function below
        for (let key in this.stringOfLetterObjects) {
            let correctOrWrong = this.stringOfLetterObjects[key].check(guess);
            this.stringOfLetterObjects[key].guessed === true;
            this.resultLetters = [];
            let i;
            for (i = 0; i < this.stringOfLetterObjects.length; i++) {
                this.resultLetters.push(this.stringOfLetterObjects[i].returnChar());
            }
            if (this.resultLetters.indexOf("_") === -1) {
                currentIndexState.currentIndexState.indexOfWords++;
                return true;
            }

        }
        term.bold.magenta(this.resultLetters.join().replace(/,/g, " "));
    }
}

module.exports = {
    Word: Word
}
