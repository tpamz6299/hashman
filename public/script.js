// Simple hangman logic
const words = ["telegram", "hangman", "javascript", "multiplayer"];
let word = words[Math.floor(Math.random() * words.length)];
let guessed = Array(word.length).fill("_");
let wrong = [];

function render() {
  document.getElementById("game").innerText = guessed.join(" ");
  document.getElementById("wrong").innerText = "Wrong guesses: " + wrong.join(", ");
}

document.addEventListener("keydown", e => {
  const letter = e.key.toLowerCase();
  if (!/^[a-z]$/.test(letter)) return;

  if (word.includes(letter)) {
    [...word].forEach((ch, i) => {
      if (ch === letter) guessed[i] = letter;
    });
  } else if (!wrong.includes(letter)) {
    wrong.push(letter);
  }
  render();
});

render();