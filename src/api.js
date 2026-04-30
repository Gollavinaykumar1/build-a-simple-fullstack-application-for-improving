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