import React, { useEffect, useState } from 'react';
import ListComponent from './components/listComponent';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch characters');
        }
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Rick and Morty Characters</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ListComponent
          items={characters}
          renderItem={(character) => (
            <div className="character-card">
              <img src={character.image} alt={character.name} />
              <div>
                <strong>{character.name}</strong>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default App;
