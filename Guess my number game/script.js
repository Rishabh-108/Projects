'use strict';
/**
 * Calculate random secret number
 */
//define the secret number outside the click event so it does not refresh every time you click the button
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
}
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔ No Number!');
  }
  else if (guess === secretNumber) {
    displayMessage('🎆 You got it!');
    document.body.style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '20rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

  } else if (guess !== secretNumber) {
    if (score > 1) {
      guess > secretNumber ? displayMessage('Too high! 😁') : displayMessage('Too low! 😜');
      score--;
      document.querySelector('.score').textContent = score;

    }
    else {
      displayMessage('oops you lost! 😜');
      document.querySelector('.score').textContent = 0;
    }
  }
}
);

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?'
  document.querySelector('.number').style.width = '15rem';
  document.body.style.backgroundColor = '#222';
});




