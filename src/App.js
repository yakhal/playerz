import * as React from 'react';
import './App.css';
import PlayerCard from './Components/PlayerCard';

export default function App() {
  const [playersData, setPlayersData] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState('');

  let searchResult = playersData;
  if (!searchQuery) {
    searchResult = playersData;
  } else {
    searchResult = playersData?.filter((player) => {
      const regex = new RegExp(searchQuery, 'i');
      return regex.test(player.TName) || regex.test(player.PFName);
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.npoint.io/20c1afef1661881ddc9c';
      try {
        const response = await fetch(url);
        const data = await response.json();
        data?.playerList.sort((a, b) => a.Value - b.Value);
        setPlayersData(data?.playerList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <article>
      <header class="app-header">
        <h1 className='container'>Playerz</h1>
      </header>
      <main>
        <div className='container search'>
          <label htmlFor='search'>
            Search Player
          </label>
          <input id='search' type="text" value={searchQuery} onChange={handleChange} />
        </div>
        <div className='container grid'>
          {searchResult &&
            searchResult?.map((player) => {
              return <PlayerCard player={player}/>
            })}
        </div>
      </main>
    </article>
  );
}