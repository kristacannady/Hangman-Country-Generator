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

var answer = "";
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var countryStatus = null;

var learnMoreBtnEl = document.querySelector('#learn-btn');

function randomCountry() {
    answer = countries[Math.floor(Math.random() * countries.length)];
}

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

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedCountry();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

// PICTURE ISSUE -  For the life of me I cannot get the picture to update correctly with mistakes 

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './Assets/images/' + mistakes + '.png';
}

function checkIfGameWon() {
    if (countryStatus === answer) {
        document.getElementById('keyboard').innerHTML = "You Won!!!";
        learnMoreBtnEl.classList.remove('learn-more');
        localStorage.setItem('answer', answer);
    }
}

learnMoreBtnEl.addEventListener('click', () => {
    window.location.href = `${window.location.href.split('/index.html')[0]}/countries.html`;
})

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

function reset() {
    mistakes = 0;
    guessed = [];
    // PICTURE ISSUE -  For the life of me I cannot get the picture to reset correctly
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