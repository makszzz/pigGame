'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // same as queryselector, , only for ID;
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
// Rolling the Dice
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting condition
const init = function () {
  const scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('.hidden'); // hidden dice;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.add('player--active');
  player1El.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll;
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice; // Here we must to remove hidden for displaying;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // load all images;

    //3. Check for rolled 1;
    if (dice !== 1) {
      // Add dice to current score;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score;
    scores[activePlayer] += currentScore;
    // scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game;
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
    } else {
      switchPlayer(); // switch to the next player;
    }
  }
});

// reset
btnNew.addEventListener('click', init);
