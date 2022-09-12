// array with the possible answers for Hangman
var countries = [
    "egypt",
    "bulgaria",
    "france",
    "nepal",
    "england",
    "spain",
    "afghanistan",
    "albania",
    "indonesia",
    "lebanon",
    "lithuania",
    "singapore",
    "uganda",
    "mozambique",
    "vietnam",
    "jamaica",
    "croatia"
]

// setting up the global variables
var answer = "";
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var countryStatus = null;

// randomizes the answer
function randomCountry() {
    answer = countries[Math.floor(Math.random() * countries.length)];
}

// onscreen keyboard setup
function keyboard() {
    var buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `<button
            class="btn"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join('');

        // inserts generated buttons into the DOM
        document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// checks to see if the letter chosen is correct, then checks win conditions
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedCountry();
        checkIfGameWon();

// if guess was incorrect, increments wrong guess counter and checks for loss
} else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
}
}

// updates the drawing to match mistake count
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './Assets/images/' + mistakes + '.png';
  }

// checks for win conditions
function checkIfGameWon() {
    if (countryStatus === answer) {
        document.getElementById('keyboard').innerHTML = "You Won!!!";
    }
}

// checks for loss conditions
function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('countrySpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = "You Lost!!!!";
    }
}

function guessedCountry() {
    countryStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('countrySpotlight').innerHTML = countryStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

// resets drawing and game state
function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './Assets/images/0.png';

randomCountry();
guessedCountry();
updateMistakes();
keyboard();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomCountry();
keyboard();
guessedCountry();