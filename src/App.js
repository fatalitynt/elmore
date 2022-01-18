import './App.css';
import data from './data.json';
import bigLogo from './images/elmo-logo.png';
import population1 from './images/population1.png';
import population2 from './images/population2.png';
import population3 from './images/population3.png';
import population4 from './images/population4.png';

const populationImages = [population1, population2, population3, population4];

function App() {
  console.log(data);
  return (
    <div className="root">
      <div className="header">
        <div className="headerDate">SITUATION ON {data.date}</div>
        <img src={bigLogo} alt="Logo"/>
        <div className="headerDate"/>
      </div>
      <div className="content">
        {renderAllies(data)}
      </div>
      <div className="footer">
        Footer
      </div>
    </div>
  );
}

function renderAllies() {
  if (data.allies != null && data.allies.length > 0) {
    return (
      <div>
        {data.allies.map((ally, idx) => renderAlly(ally, idx))}
      </div>
    );
  }
}

function renderAlly(ally, idx) {
  if (ally.clans != null && ally.clans.length > 0) {
    return (
      <table className="ally" key={idx}>
        <thead className="allyTableHeader">
        <tr>
          <th className="clanNameHeader">{ally.name}</th>
          <th className="clHeader">LEADER</th>
          <th className="otherColumn">CASTLE</th>
          <th className="otherColumn">CLAN HALL</th>
          <th className="otherColumn">PRIORITY</th>
          <th className="otherColumn">MEMBERS</th>
        </tr>
        </thead>
        <tbody>
        {ally.clans.map((x, idx) => renderClan(x, idx))}
        </tbody>
      </table>
    );
  }
}

function renderClan(clan, idx) {
  return (
    <tr key={idx}>
      <th className="clanName">{clan.name}</th>
      <th className="cl">{clan.clName}</th>
      <th className={clan.castle === "NONE" ? "empty" : "castle"}>{clan.castle}</th>
      <th className={clan.clanHall === "NONE" ? "empty" : "ch"}>{clan.clanHall}</th>
      <th className={getGoalClassName(clan.goal)}>{clan.goal}</th>
      <th><img src={populationImages[clan.population - 1]}/></th>
    </tr>
  );
}

function getGoalClassName(value) {
  if (value === "PVP") return "goalPurple";
  if (value === "PVE") return "goalWhite";
  return "empty";
}

export default App;
