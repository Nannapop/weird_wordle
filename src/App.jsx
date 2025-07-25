import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://cheaderthecoder.github.io/5-Letter-words/words.txt";
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const text = await response.text();
      const words = text
        .split("\n")
        .map((w) => w.trim().toLowerCase())
        .filter((w) => w.length === WORD_LENGTH);
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    };
    fetchWord().catch(console.error);
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value.slice(0, WORD_LENGTH));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== WORD_LENGTH) {
      setStatus("กรุณากรอกคำ 5 ตัวอักษร");
      return;
    }
    setGuesses([...guesses, input.toLowerCase()]);
    setInput("");
    if (input.toLowerCase() === solution) {
      setStatus("WIN แล้ว น้องเอ๋ย!");
    } else if (guesses.length + 1 === MAX_GUESSES) {
      setStatus(`หมดรอบแล้วน้อง คำตอบคือ: ${solution}`);
    } else {
      setStatus("");
    }
  };

  const usedLetters = Array.from(new Set(guesses.join("").split("")))
    .filter((c) => /^[a-z]$/.test(c))
    .sort();

  return (
    <div className="App">
      <div style={{ margin: "10px 0", color: "WHITE" }}>
        <h2>Wordle </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInput}
          maxLength={WORD_LENGTH}
          disabled={guesses.length >= MAX_GUESSES || status === "คุณชนะ!"}
        />
        <button
          type="submit"
          disabled={guesses.length >= MAX_GUESSES || status === "คุณชนะ!"}
        >
          เดา
        </button>
      </form>
      <div style={{ margin: "10px 0", color: "red" }}>{status}</div>
      {Array.from({ length: MAX_GUESSES }).map((_, idx) => (
        <Line key={idx} guess={guesses[idx] ?? ""} solution={solution} />
      ))}

      <div style={{ marginTop: "20px", color: "#fff", fontSize: "1.2em" }}>
        <b>ตัวอักษรที่ใช้ไปแล้ว:</b>
        <div style={{ letterSpacing: "8px", marginTop: "8px" }}>
          {usedLetters.length > 0 ? usedLetters.join(" ") : "-"}
        </div>
      </div>
    </div>
  );
}

function Line({ guess, solution }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i] || "";
    let className = "tile";
    if (char) {
      if (solution[i] === char) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " present";
      } else {
        className += " absent";
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {char.toUpperCase()}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
}
