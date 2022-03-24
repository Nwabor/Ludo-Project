`use strict`;
// selecting Elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0"); // selecting an Id
const score1El = document.getElementById("score--1"); // selecting an Id
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const btnCurrent = document.querySelector(".current-score");
const diceEl = document.querySelector(".dice");
// Starting condition

diceEl.classList.add("hidden");
score0EL.textContent = 0;
score1El.textContent = 0;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

// Making the Roll Dice button interactive

btnRoll.addEventListener("click", function () {
  // 1. start by generating a random dice roll
  const dice = Math.trunc(Math.random() * 6 + 1);
  //   console.log(dice);
  // 2. Display  dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  // 3. check if roll is 1: if true, switch to next player
  if (dice !== 1) {
    currentScore += dice;
    // current0EL.textContent = currentScore;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    // current0EL.textContent = currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

// what will happen when the hold button was clicked
btnHold.addEventListener("click", function () {
  // Add current score to active player
  scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // check if player's score is  >= 100

  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    //switch to the next player
    switchPlayer();
  }
  // finish the game
});
btnNew.addEventListener("click", function () {
  document.querySelector(`.player--${activePlayer}`).textContent = currentScore;
});
