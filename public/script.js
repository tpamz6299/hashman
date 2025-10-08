const words = ["telegram", "hangman", "javascript", "multiplayer"];
let word = words[Math.floor(Math.random() * words.length)];
let guessed = Array(word.length).fill("_");
let wrong = [];

document.getElementById("game").innerHTML = `
  <p>${guessed.join(" ")}</p>
  <p>Wrong guesses: ${wrong.join(", ")}</p>
`;

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

  document.getElementById("game").innerHTML = `
    <p>${guessed.join(" ")}</p>
    <p>Wrong guesses: ${wrong.join(", ")}</p>
  `;
});