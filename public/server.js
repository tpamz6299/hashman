const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

let words = ["telegram", "hangman", "javascript", "multiplayer", "github", "render"];

let gameState = {
  word: pickWord(),
  guessed: [],
  wrong: []
};

function pickWord() {
  return words[Math.floor(Math.random() * words.length)];
}

io.on("connection", (socket) => {
  console.log("✅ A user connected");
  socket.emit("state", gameState);

  socket.on("guess", (letter) => {
    if (gameState.word.includes(letter)) {
      if (!gameState.guessed.includes(letter)) {
        gameState.guessed.push(letter);
      }
    } else {
      if (!gameState.wrong.includes(letter)) {
        gameState.wrong.push(letter);
      }
    }
    io.emit("state", gameState);
  });

  socket.on("newGame", () => {
    gameState = { word: pickWord(), guessed: [], wrong: [] };
    io.emit("state", gameState);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});