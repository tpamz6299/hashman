// List of words for the game
const words = ["javascript", "hangman", "coding", "developer", "render", "github"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctGuesses = [];
let wrongGuesses = [];

const wordDiv = document.getElementById("word");
const wrongDiv = document.getElementById("wrong-guesses");
const lettersDiv = document.getElementById("letters");

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
  button.disabled = true; // disable button after click
  if (selectedWord.includes(letter)) {
    correctGuesses.push(letter);
    displayWord();
    checkWin();
  } else {
    wrongGuesses.push(letter);
    displayWrong();
    checkLose();
  }
}

// Check win
function checkWin() {
  if (selectedWord.split("").every(letter => correctGuesses.includes(letter))) {
    setTimeout(() => alert("🎉 You win! The word was: " + selectedWord), 100);
    resetGame();
  }
}

// Check lose
function checkLose() {
  if (wrongGuesses.length >= 6) {
    setTimeout(() => alert("💀 You lost! The word was: " + selectedWord), 100);
    resetGame();
  }
}

// Reset game
function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  wrongGuesses = [];
  displayWord();
  displayWrong();
  createButtons();
}

// Start game
displayWord();
displayWrong();
createButtons();