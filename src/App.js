import './App.css';
import data from './data.json';
import bigLogo from './images/elmo-logo.png';
import lang_cz from './images/lang/lang_cz.png';
import lang_en from './images/lang/lang_en.png';
import lang_gr from './images/lang/lang_gr.png';
import lang_pol from './images/lang/lang_pol.png';
import lang_por from './images/lang/lang_por.png';
import lang_ru from './images/lang/lang_ru.png';
import lang_sp from './images/lang/lang_sp.png';
import lang_multi from './images/lang/lang_multi.png';
import Footer from './footer/Footer';
import Clan from './clan/Clan';
import {renderClanTableHeader} from "./clan/Clan";

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
        {renderRandomClans(data.clans)}
      </div>
      {Footer()}
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

function renderRandomClans(clans) {
  return (
    <div>
      <div className="randomClansTable">
        {renderClanTableHeader(() => "CLANS WITHOUT ALLIANCE")}
        {clans.map((clan, idx) => <div key={idx}>{Clan(clan)}</div>)}
      </div>
    </div>
  );
}

function renderAlly(ally, idx) {
  if (ally.clans != null && ally.clans.length > 0) {
    return (
      <div className="allyTable" key={idx}>
        {renderClanTableHeader(() => renderAllyName(ally))}
        {ally.clans.map((x, idx) => <div key={idx}>{Clan(x)}</div>)}
      </div>
    );
  }
}

function renderAllyName(ally) {
  return (
    <div className="allyName">
      {ally.name}
      {ally.languages && ally.languages.map((x, idx) => {
        return <img className="clanNameHeaderLangIcon" key={idx} src={getLanguageIconByCode(x)} alt={x}/>
      })}
    </div>
  );
}

function getLanguageIconByCode(code) {
  switch (code) {
    case "cz":
      return lang_cz;
    case "en":
      return lang_en;
    case "gr":
      return lang_gr;
    case "pol":
      return lang_pol;
    case "por":
      return lang_por;
    case "ru":
      return lang_ru;
    case "sp":
      return lang_sp;
    case "multi":
      return lang_multi;
    default:
      return null;
  }
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
