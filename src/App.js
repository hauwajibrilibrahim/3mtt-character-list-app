// src/App.js
import React, { useEffect, useState } from 'react';
import ListComponent from './components/listComponent';
import Spinner from './components/Spinner';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Rick and Morty Characters</h1>

      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ListComponent
          items={filteredCharacters}
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
