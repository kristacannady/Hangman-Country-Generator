var countries = [
    "Egypt",
    "Bulgaria",
    "France",
    "Nepal",
    "England",
    "Spain",
    "Afghanistan",
    "Albania",
    "Indonesia",
    "Lebanon",
    "Lithuania",
    "Singapore",
    "Uganda",
    "Mozambique",
    "Vietnam",
    "Jamaica",
    "Croatia"
]

var answer = "";
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var countryStatus = null;

function randomCountry() {
    answer = countries[Math.floor(Math.random() * countries.length)];
}

function keyboard() {
    var buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `<button
            class="btn"
            id='` + letter + `
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join('');

        document.getElementById('keyboard').innerHTML = buttonsHTML;
};

function guessedCountry() {
    countryStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('countrySpotlight').innerHTML = countryStatus;
}

// this line was creating problems with the keyboard and I wasn't
// sure if we would want to include the "wrong guesses" tracker anyway
// document.getElementById().innerHTML('maxWrong') = maxWrong;


randomCountry();
keyboard();
guessedCountry();