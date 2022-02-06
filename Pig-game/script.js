'use strict';

//Selecting elements
const p1Section = document.querySelector('.player--0');
const p2Section = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScoreP1 = document.getElementById('current--0');
const currentScoreP2 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Global variables
let currentScore, scores, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; //binary (P1 or P2)
  playing = true;

  //starting condition
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;

  diceEl.classList.add('hidden');
  p1Section.classList.remove('player--winner');
  p2Section.classList.remove('player--winner');
  //P1 always starts
  p1Section.classList.add('player--active');
  p2Section.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //allows a switch b/w players
  currentScore = 0;

  //Highlighting the active player
  p1Section.classList.toggle('player--active');
  p2Section.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. GENEREATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`

    //3. Check for rolled 1: if trure, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. ADD CURRENT SCORE TO ACTIVES PLAYER'S SCORE
    scores[activePlayer] += currentScore;
    //eg, scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. if current score >= 100 then active player wins!
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    } else {
      //3. Else switch to next player
      switchPlayer();
    }
  }
});


//Reset the game
btnNew.addEventListener('click', init);
