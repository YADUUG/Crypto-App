import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(response => response.json())
      .then(data => setCoins(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Crypto Tracker</h1>
      <input
        type="text"
        placeholder="Search for a coin"
        value={search}
        onChange={handleSearchChange}
      />
      <div className="coin-list">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="coin">
            <img src={coin.image} alt={coin.name} />
            <h2>{coin.name}</h2>
            <p>${coin.current_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
