import './App.css';
import data from './data.json';
import bigLogo from './images/elmo-logo.png';
import population1 from './images/population/population1.png';
import population2 from './images/population/population2.png';
import population3 from './images/population/population3.png';
import population4 from './images/population/population4.png';
import lang_cz from './images/lang/lang_cz.png';
import lang_en from './images/lang/lang_en.png';
import lang_gr from './images/lang/lang_gr.png';
import lang_pol from './images/lang/lang_pol.png';
import lang_por from './images/lang/lang_por.png';
import lang_ru from './images/lang/lang_ru.png';
import lang_sp from './images/lang/lang_sp.png';
import lang_multi from './images/lang/lang_multi.png';
import crown from './images/crown.png';

const populationImages = [population1, population2, population3, population4];

function App() {
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
      {renderFooter()}
    </div>
  );
}

function renderAllies() {
  if (data.allies != null && data.allies.length > 0) {
    let leftNbOfAllies = findLeftColumnAlliesNb(data.allies);
    return (
      <div className="alliesContainer">
        <div className="alliesContainerLeft">
          {data.allies.slice(0, leftNbOfAllies).map((ally, idx) => renderAlly(ally, idx))}
        </div>
        <div className="alliesContainerRight">
          {data.allies.slice(leftNbOfAllies).map((ally, idx) => renderAlly(ally, idx))}
        </div>
      </div>
    );
  }
}

function renderAlly(ally, idx) {
  if (ally.clans != null && ally.clans.length > 0) {
    return (
      <div key={idx}>
        <table className="allyTable">
          <thead className="allyTableHeader">
          <tr>
            <th className="clanNameHeader" colSpan={3}>
              {ally.name}
              {ally.languages && ally.languages.map((x, idx) => {
                return <img className="clanNameHeaderLangIcon" key={idx} src={getLanguageIconByCode(x)} alt={x}/>
              })}
            </th>
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
      </div>
    );
  }
}

function renderClan(clan, idx) {
  return (
    <tr key={idx}>
      <th className="clanImgColumn">
        {clan.img && <img className="clanImg" src={"data:image/png;base64," + clan.img} alt={""}/>}
      </th>
      <th className="clanName">{clan.name}</th>
      <th>
        {clan.isAllyLeader && <img className="clCrown" src={crown} alt={"AL"}/>}
      </th>
      <th className="cl">{clan.clName}</th>
      <th className={clan.castle === "NONE" ? "empty" : "castle"}>{clan.castle}</th>
      <th className={clan.clanHall === "NONE" ? "empty" : "ch"}>{clan.clanHall}</th>
      <th className={getGoalClassName(clan.goal)}>{clan.goal}</th>
      <th><img src={populationImages[clan.population - 1]} alt={clan.population}/></th>
    </tr>
  );
}

function getGoalClassName(value) {
  if (value === "PVP") return "goalPurple";
  if (value === "PVE" || value === "AFK") return "goalWhite";
  if (value === "Friendly") return "goalGreen";
  return "empty";
}

function getLanguageIconByCode(code) {
  switch (code) {
    case "cz": return lang_cz;
    case "en": return lang_en;
    case "gr": return lang_gr;
    case "pol": return lang_pol;
    case "por": return lang_por;
    case "ru": return lang_ru;
    case "sp": return lang_sp;
    case "multi": return lang_multi;
    default: return null;
  }
}

const lang_icons = [lang_cz, lang_en, lang_gr, lang_pol, lang_por, lang_ru, lang_sp, lang_multi];
const lang_names = ["Czech language", "English language", "Greek language", "Polish language", "Portuguese language", "Russian language", "Spanish language", "Multilingual"];

function renderFooter() {
  return (<div className="footer">
    <div className="langLegend">
      {lang_icons.map((icon, idx) => {
        return <div className="langLegendItem" key={idx}>
          <img className="langLegendItemIcon" src={icon} alt={lang_names[idx]}/>
          <span style={{paddingLeft: 10}}>{lang_names[idx]}</span>
        </div>
      })}
    </div>
  </div>);
}

function findLeftColumnAlliesNb(allies) {
  let totalSum = 0;
  allies.forEach(a => totalSum += a.clans.length);
  let idx = 0;
  let localSum = 0;
  while (localSum < totalSum / 2) {
    localSum += allies[idx].clans.length;
    idx++;
  }
  return idx;

}

export default App;
