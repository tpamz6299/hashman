const words = ["javascript", "hangman", "coding", "developer", "render", "github"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctGuesses = [];
let wrongGuesses = [];

const wordDiv = document.getElementById("word");
const wrongDiv = document.getElementById("wrong-guesses");
const lettersDiv = document.getElementById("letters");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

// Show underscores for the word
function displayWord() {
  wordDiv.textContent = selectedWord
    .split("")
    .map(letter => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");
}

// Show wrong guesses
function displayWrong() {
  wrongDiv.textContent = "Wrong guesses: " + wrongGuesses.join(", ");
}

// Create A–Z buttons
function createButtons() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  lettersDiv.innerHTML = "";
  alphabet.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.addEventListener("click", () => handleGuess(letter, btn));
    lettersDiv.appendChild(btn);
  });
}

// Handle guess
function handleGuess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    correctGuesses.push(letter);
    displayWord();
    checkWin();
  } else {
    wrongGuesses.push(letter);
    displayWrong();
    drawHangman(wrongGuesses.length);
    checkLose();
  }
}

// Check win
function checkWin() {
  if (selectedWord.split("").every(letter => correctGuesses.includes(letter))) {
    setTimeout(() => {
      alert("🎉 You win! The word was: " + selectedWord);
      resetGame();
    }, 100);
  }
}

// Check lose
function checkLose() {
  if (wrongGuesses.length >= 6) {
    setTimeout(() => {
      alert("💀 You lost! The word was: " + selectedWord);
      resetGame();
    }, 100);
  }
}

// Reset game
function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  wrongGuesses = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear hangman
  displayWord();
  displayWrong();
  createButtons();
}

// Draw hangman parts
function drawHangman(step) {
  switch (step) {
    case 1: // base
      ctx.beginPath();
      ctx.moveTo(10, 190);
      ctx.lineTo(190, 190);
      ctx.stroke();
      break;
    case 2: // pole
      ctx.beginPath();
      ctx.moveTo(50, 190);
      ctx.lineTo(50, 20);
      ctx.lineTo(120, 20);
      ctx.lineTo(120, 40);
      ctx.stroke();
      break;
    case 3: // head
      ctx.beginPath();
      ctx.arc(120, 55, 15, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 4: // body
      ctx.beginPath();
      ctx.moveTo(120, 70);
      ctx.lineTo(120, 120);
      ctx.stroke();
      break;
    case 5: // arms
      ctx.beginPath();
      ctx.moveTo(120, 80);
      ctx.lineTo(90, 100);
      ctx.moveTo(120, 80);
      ctx.lineTo(150, 100);
      ctx.stroke();
      break;
    case 6: // legs
      ctx.beginPath();
      ctx.moveTo(120, 120);
      ctx.lineTo(100, 160);
      ctx.moveTo(120, 120);
      ctx.lineTo(140, 160);
      ctx.stroke();
      break;
  }
}

// Start game
displayWord();
displayWrong();
createButtons();