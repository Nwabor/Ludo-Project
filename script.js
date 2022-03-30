"use strict";
// this will change the initial value from 43 ansd 23 to 0 these 2 codes below does same thing
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
// declaring the classes
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let scores, currentScore, activePlayer, playing;
// starting conditions
const init = function () {
  scores = [0, 0]; // holding the active player
  currentScore = 0; // variable to save the value of dice
  activePlayer = 0;
  playing = true;

  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;

  // hiding the dice using the hidden class selected
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling the dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generate a random number from 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. display dice

    diceEl.classList.remove("hidden"); // remove the hidden class
    diceEl.src = `dice-${dice}.png`; // mabipulating the source image from displaying dice-5 to display any random number

    //3. check for rolled 1: if true , switch to next player

    if (dice != 1) {
      //add dice to the current score
      currentScore += dice; // counter
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      // switch to the next player
      // first the score of current player has to be set to zero
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1 Add current score to active player's score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100

    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false; // dont allow any button to be clicked
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
