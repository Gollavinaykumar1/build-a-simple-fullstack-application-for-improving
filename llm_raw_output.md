# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Games from './components/Games';
import Puzzles from './components/Puzzles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getGames, getPuzzles } from './api';

function App() {
  const [games, setGames] = useState([]);
  const [puzzles, setPuzzles] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGames();
      setGames(data);
    };
    const fetchPuzzles = async () => {
      const data = await getPuzzles();
      setPuzzles(data);
    };
    fetchGames();
    fetchPuzzles();
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home games={games} puzzles={puzzles} />} />
            <Route path="/games" element={<Games games={games} />} />
            <Route path="/puzzles" element={<Puzzles puzzles={puzzles} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
  font-family: 'Inter', sans-serif;
}

.container {
  @apply mx-auto p-4;
}
=== END ===

=== FILE: src/api.js ===
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getGames = async () => {
  const response = await fetch(`${BASE_URL}/games`);
  const data = await response.json();
  return data;
};

const getPuzzles = async () => {
  const response = await fetch(`${BASE_URL}/puzzles`);
  const data = await response.json();
  return data;
};

const submitGame = async (gameId, score) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
  });
  const data = await response.json();
  return data;
};

const submitPuzzle = async (puzzleId, answer) => {
  const response = await fetch(`${BASE_URL}/puzzles/${puzzleId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  });
  const data = await response.json();
  return data;
};

export { getGames, getPuzzles, submitGame, submitPuzzle };
=== END ===