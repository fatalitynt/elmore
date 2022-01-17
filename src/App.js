import './App.css';
import data from './data.json';

function App() {
  console.log(data);
  return (
    <div>
      {renderClans(data)}
    </div>
  );
}

function renderClans(data) {
  if (data.clans != null && data.clans.length > 0) {
    return (
      <div id="clans">
        {data.clans.map(c => renderClan(c))}
      </div>
    );
  }
}

function renderClan(clan) {
  return (
    <div>
      <div>{clan.name}</div>
      <div>{clan.clName}</div>
      <div>{clan.castle}</div>
      <div>{clan.clanHall}</div>
      <div>{clan.goal}</div>
      <div>{clan.population}</div>
    </div>
  );
}

export default App;
