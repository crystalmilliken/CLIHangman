//creates a letter object, returns either the letter or an underscore
function Letter(currentLetter) {
    this.currentLetter = currentLetter;
    this.guessed = false;
    this.returnChar = function () {
        if (this.guessed) {
            return this.currentLetter;
        } else {
            return "_"
        }
    }
    this.check = function (guess) {
        if (guess === this.currentLetter) {
            this.guessed = true;
            return true;
        }
    }
}
module.exports = {
    Letter: Letter
}

