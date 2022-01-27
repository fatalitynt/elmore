import './Clan.css';
import crown from "../images/crown.png";
import population1 from "../images/population/population1.png";
import population2 from "../images/population/population2.png";
import population3 from "../images/population/population3.png";
import population4 from "../images/population/population4.png";

function Clan(props) {
  return (
    <div className="clanRoot">
      <div className="clanIcon">
        {!!props.Img && <img className="clanIconImage" src={"data:image/png;base64," + props.Img} alt={""}/>}
      </div>
      <div className="clanName">
        {props.Name}
      </div>
      <div className="clanCrown">
        {props.IsAllyLeader && <img className="clCrown" src={crown} alt={"AL"}/>}</div>
      <div className="clanLeader">
        {props.ClName}
      </div>
      <div className="clanCastle" style={{color: getCastleColor(props.Castle)}}>
        {props.Castle || "NONE"}
      </div>
      <div className="clanHall" style={{color: getClanHallColor(props.ClanHall)}}>
        {props.ClanHall || "NONE"}
      </div>
      <div className="clanGoal" style={{color: getGoalColor(props.Goal)}}>
        {props.Goal || "–"}
      </div>
      <div className="clanPopulation">
        <img src={getPopulationImage(props.Population)} alt={props.Population}/>
      </div>
    </div>
  );
}

function getCastleColor(value) {
  if (value) return "#00bc8c";
  return "#808080";
}

function getClanHallColor(value) {
  if (value) return "#f39c12";
  return "#808080";
}

function getGoalColor(value) {
  if (value === "PVP") return "#f700f7";
  if (value === "PVE" || value === "AFK") return "#ffffff";
  if (value === "Friendly") return "#00bc8c";
  return "empty";
}

function getPopulationImage(population) {
  if (population < 11) return population1;
  if (population < 21) return population2;
  if (population < 31) return population3;
  return population4;

}

export function renderClanTableHeader(renderClanNameHeader) {
  return (
    <div className="clanTableHeader">
      <div style={{width: 185}}>{renderClanNameHeader()}</div>
      <div style={{width: 110, textAlign: "left"}}>LEADER</div>
      <div style={{width: 85, textAlign: "center"}}>CASTLE</div>
      <div style={{width: 85, textAlign: "center"}}>CLAN HALL</div>
      <div style={{width: 85, textAlign: "center"}}>PRIORITY</div>
      <div style={{width: 85, textAlign: "center"}}>MEMBERS</div>
    </div>
  );
}

export default Clan;