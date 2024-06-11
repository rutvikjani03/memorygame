const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector(".resetButton");
let isFlipped = false;
let firstCard, secondCard;
let isChecking = false;
let score = 0;

cards.forEach((card) => card.addEventListener("click", flip));

resetButton.addEventListener("click", function () {
  window.location.reload();
});

function flip() {
  if (isChecking || this === firstCard || this.classList.contains("flip")) return;

  this.classList.add("flip");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
  } else {
    isFlipped = false;
    secondCard = this;
    check();
  }
}

function check() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    success();
  } else {
    fail();
  }
}

function updateScore() {
  document.getElementById("makescore").textContent = score;

  const redo = document.getElementById("makescore");

  if (score < 0) {
    redo.style.color = "red";
  } else {
    redo.style.color = "green";
  }
}

function success() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);

  score += 10;

  updateScore();
  reset();
  checkGameOver();
}

function fail() {
  isChecking = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
    isChecking = false;
  }, 1000);

  score -= 5;

  updateScore();
}

function reset() {
  isFlipped = false;
  firstCard = null;
  secondCard = null;
}

function checkGameOver() {
  const allFlipped = document.querySelectorAll('.card.flip').length === cards.length;
  if (allFlipped) {
    setTimeout(() => {
      const gameOverMessage = document.getElementById('gameOverMessage');
      const finalScore = document.getElementById('finalScore');
      finalScore.textContent = score;
      gameOverMessage.style.display = 'block';
    }, 500);
  }
}

(function shuffle() {
  cards.forEach((card) => {
    const index = Math.floor(Math.random() * cards.length);
    card.style.order = index;
  });
})();
