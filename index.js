'use strict';

// Secret number
let secretNumber;

// Buttons
const checkButton = document.getElementById('check_button');
const newGameButton = document.getElementById('reset_button');
const helpButton = document.getElementById('help_button');

// Elements
const guessValueElement = document.getElementById('guess_value');
const secretNumberElement = document.getElementById('secret_number');
const statusElement = document.querySelector('#results #status');
const scoreElement = document.querySelector('#results #score');
const highScoreElement = document.querySelector('#results #high_score');


// Default values
const defaultSecretNumber = secretNumberElement.textContent;
const defaultStatusValue = statusElement.textContent;
const defaultScoreValue = scoreElement.textContent;
const defaultGuessValue = guessValueElement.value;

newGameButton.addEventListener('click', newGame);
checkButton.addEventListener('click', checkGuess);

// Init game
newGame();

// Functions
/**
 * New game.
 */
function newGame() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    secretNumberElement.textContent = defaultSecretNumber;
    scoreElement.textContent = defaultScoreValue;
    statusElement.textContent = defaultStatusValue;
    checkButton.disabled = false;
    guessValueElement.disabled = false;
    guessValueElement.value = defaultGuessValue;
    guessValueElement.focus();
    secretNumberElement.className = '';
}

/**
 * Win game.
 */
function winGame(scoreValue) {
    const highScoreValue = Number(highScoreElement.textContent);

    checkButton.disabled = true;
    guessValueElement.disabled = true;
    statusElement.textContent = 'Congratulation!';
    secretNumberElement.classList.add('win');
    secretNumberElement.textContent = secretNumber.toString();

    if (highScoreValue < scoreValue) {
        highScoreElement.textContent = scoreValue.toString();
    }
}

/**
 * Lose game.
 */
function loseGame() {
    checkButton.disabled = true;
    guessValueElement.disabled = true;
    statusElement.textContent = 'You lose!';

    secretNumberElement.textContent = secretNumber.toString();
    secretNumberElement.classList.add('lose');
}

/**
 * Check guess.
 */
function checkGuess() {
    const guessedValue = Number(guessValueElement.value);
    let scoreValue = Number(scoreElement.textContent);

    if (guessedValue === secretNumber) {
        winGame(scoreValue);
        return;
    }

    guessValueElement.focus();
    guessValueElement.select();

    if (!guessedValue || guessedValue > 20) {
        statusElement.textContent = 'Invalid input!';
        return;
    }

    if ((--scoreValue) === 0) {
        loseGame();
    } else if (guessedValue < secretNumber) {
        statusElement.textContent = 'To low!';
    } else {
        statusElement.textContent = 'To high!';
    }
    scoreElement.textContent = scoreValue.toString();
}