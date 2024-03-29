import './App.css';
import alliesData from './data/allies.json';
import serverMeta from './data/serverMeta.json'
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

const clanGoalsMap = createClanGoalMap();
const clansMap = createClansMap();
const clanNamesWithoutAlly = getClansNamesWithoutAlly();

function App() {
  return (
    <div className="root">
      <div className="header">
        INFORMATION ON {serverMeta.Date}
      </div>
      <div className="content">
        {renderAllies(alliesData)}
        {renderClansWithoutAlly(clanNamesWithoutAlly)}
      </div>
      {Footer()}
    </div>
  );
}

function renderAllies(alliesData) {
  if (alliesData.Allies != null && alliesData.Allies.length > 0) {
    return (
      <div>
        {alliesData.Allies.filter(x => shouldRenderAlly(x))
          .map((ally, idx) => renderAlly(extendAllyInfo(ally), idx))}
      </div>
    );
  }
}

function renderClansWithoutAlly(clanNames) {
  if (!!clanNames && clanNames.length > 0) {
    clanNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return (
        <div className="allyTable">
          {renderClanTableHeader(() => "CLANS WITHOUT ALLIANCE")}
          <div className="allyTableContent">
            {clanNames
                .map(x => clansMap[x])
                .filter(x => shouldRenderRandomClan(x))
                .map((x, idx) => <div key={idx}>{Clan(x)}</div>)}
          </div>
        </div>
    );
  }
}

function shouldRenderRandomClan(clan) {
  return clan.Population > 20 || !!serverMeta.ClanHalls[clan.name] || !!serverMeta.Castles[clan.Name];
}

function shouldRenderAlly(ally) {
  let allyPopulation = 0;
  let allyHasClanHall = false;
  let allyHasCastle = false;
  ally.Clans.forEach(x => {
    let clan = clansMap[x];
    allyPopulation += clan.Population;
    allyHasClanHall = allyHasClanHall || !!clan.ClanHall;
    allyHasCastle = allyHasCastle || !!clan.Castle;
  });
  return allyPopulation > 40 || allyHasClanHall || allyHasCastle;
}

function renderAlly(ally, idx) {
  const clanNames = ally.Clans;
  clanNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const clans = clanNames.map(x => clansMap[x]);
  if (clans.length > 0) {
    return (
      <div className="allyTable" key={idx}>
        {renderClanTableHeader(() => renderAllyName(ally))}
        <div className="allyTableContent">
          {clans.map((x, idx) => <div key={idx}>{Clan(x)}</div>)}
        </div>
      </div>
    );
  }
}

function renderAllyName(ally) {
  return (
    <div className="allyName">
      {ally.Name}
      {ally.Languages && ally.Languages.map((x, idx) => {
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

function extendAllyInfo(ally) {
  if (!!serverMeta.AllyLanguages[ally.Name]) ally.Languages = serverMeta.AllyLanguages[ally.Name];
  return ally;
}

function extendClanInfo(clan) {
  if (!!serverMeta.Castles[clan.Name]) clan.Castle = serverMeta.Castles[clan.Name];
  if (!!serverMeta.ClanHalls[clan.Name]) clan.ClanHall = serverMeta.ClanHalls[clan.Name];
  if (!!clanGoalsMap[clan.Name]) clan.Goal = clanGoalsMap[clan.Name];
  if (!!serverMeta.ClanIcons[clan.Name]) clan.Img = serverMeta.ClanIcons[clan.Name];
  return clan;
}

function createClanGoalMap() {
  let dict = {};
  serverMeta.ClanGoals.PVP.forEach(x => dict[x] = "PVP");
  serverMeta.ClanGoals.PVE.forEach(x => dict[x] = "PVE");
  serverMeta.ClanGoals.PK.forEach(x => dict[x] = "PK");
  serverMeta.ClanGoals.AFK.forEach(x => dict[x] = "AFK");
  serverMeta.ClanGoals.Friendly.forEach(x => dict[x] = "Friendly");
  serverMeta.ClanGoals.Twinkies.forEach(x => dict[x] = "Twinkies");
  return dict;
}

function createClansMap() {
  let dict = {};
  alliesData.Clans.forEach(x => dict[x.Name] = extendClanInfo(x));
  return dict;
}

function getClansNamesWithoutAlly() {
  let clansWithAlly = {};
  alliesData.Allies.forEach(a => a.Clans.forEach(c => clansWithAlly[c] = true));
  return alliesData.Clans.map(x => x.Name).filter(x => !clansWithAlly[x]);
}

function getAllyMemberNumber(ally) {
  return ally.Clans.map(x => clansMap[x].Population).reduce((a, b) => a + b);
}

export default App;
