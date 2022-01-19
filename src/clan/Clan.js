import './Clan.css';
import crown from "../images/crown.png";
import population1 from "../images/population/population1.png";
import population2 from "../images/population/population2.png";
import population3 from "../images/population/population3.png";
import population4 from "../images/population/population4.png";

const populationImages = [population1, population2, population3, population4];

function Clan(props) {
  return (
    <div className="clanRoot">
      <div className="clanIcon">
        {props.img && <img className="clanIconImage" src={"data:image/png;base64," + props.img} alt={""}/>}
      </div>
      <div className="clanName">
        {props.name}
      </div>
      <div className="clanCrown">
        {props.isAllyLeader && <img className="clCrown" src={crown} alt={"AL"}/>}</div>
      <div className="clanLeader">
        {props.clName}
      </div>
      <div className="clanCastle" style={{color: getCastleColor(props.castle)}}>
        {props.castle}
      </div>
      <div className="clanHall" style={{color: getClanHallColor(props.clanHall)}}>
        {props.clanHall}
      </div>
      <div className="clanGoal" style={{color: getGoalColor(props.goal)}}>
        {props.goal}
      </div>
      <div className="clanPopulation">
        <img src={populationImages[props.population - 1]} alt={props.population}/>
      </div>
    </div>
  );
}

function getCastleColor(value) {
  if (value !== "NONE") return "#08dd0f";
  return "#808080";
}

function getClanHallColor(value) {
  if (value !== "NONE") return "#d4b664";
  return "#808080";
}

function getGoalColor(value) {
  if (value === "PVP") return "#f700f7";
  if (value === "PVE" || value === "AFK") return "#ffffff";
  if (value === "Friendly") return "#08dd0f";
  return "empty";
}

export function renderClanTableHeader(renderClanNameHeader) {
  return (
    <div style={{width: 570, display: "flex", marginBottom: 3}}>
      <div style={{width: 170}}>{renderClanNameHeader()}</div>
      <div style={{width: 100}}>LEADER</div>
      <div style={{width: 75, textAlign: "center"}}>CASTLE</div>
      <div style={{width: 75, textAlign: "center"}}>CLAN HALL</div>
      <div style={{width: 75, textAlign: "center"}}>PRIORITY</div>
      <div style={{width: 75, textAlign: "center"}}>MEMBERS</div>
    </div>
  );
}

export default Clan;