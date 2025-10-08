const socket = io();

let gameState = { word: "", guessed: [], wrong: [] };

const wordDiv = document.getElementById("word");
const wrongDiv = document.getElementById("wrong-guesses");
const lettersDiv = document.getElementById("letters");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

// Render the game state
function render(state) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  wordDiv.textContent = state.word
    .split("")
    .map(letter => (state.guessed.includes(letter) ? letter : "_"))
    .join(" ");

  wrongDiv.textContent = "Wrong guesses: " + state.wrong.join(", ");

  drawHangman(state.wrong.length);

  if (state.word.split("").every(l => state.guessed.includes(l))) {
    wrongDiv.textContent = "🎉 You win! The word was: " + state.word;
    setTimeout(() => socket.emit("newGame"), 2000);
  }

  if (state.wrong.length >= 6) {
    wrongDiv.textContent = "💀 You lost! The word was: " + state.word;
    setTimeout(() => socket.emit("newGame"), 2000);
  }
}

// Create buttons for A–Z
function createButtons() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  lettersDiv.innerHTML = "";
  alphabet.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.addEventListener("click", () => {
      socket.emit("guess", letter);
      btn.disabled = true;
    });
    lettersDiv.appendChild(btn);
  });
}

// Draw hangman figure
function drawHangman(step) {
  switch (step) {
    case 1: ctx.beginPath(); ctx.moveTo(10,190); ctx.lineTo(190,190); ctx.stroke(); break;
    case 2: ctx.beginPath(); ctx.moveTo(50,190); ctx.lineTo(50,20); ctx.lineTo(120,20); ctx.lineTo(120,40); ctx.stroke(); break;
    case 3: ctx.beginPath(); ctx.arc(120,55,15,0,Math.PI*2); ctx.stroke(); break;
    case 4: ctx.beginPath(); ctx.moveTo(120,70); ctx.lineTo(120,120); ctx.stroke(); break;
    case 5: ctx.beginPath(); ctx.moveTo(120,80); ctx.lineTo(90,100); ctx.moveTo(120,80); ctx.lineTo(150,100); ctx.stroke(); break;
    case 6: ctx.beginPath(); ctx.moveTo(120,120); ctx.lineTo(100,160); ctx.moveTo(120,120); ctx.lineTo(140,160); ctx.stroke(); break;
  }
}

// Listen for state updates from server
socket.on("state", (state) => {
  gameState = state;
  render(state);
  createButtons();
});