import './Footer.css';
import lang_cz from "../images/lang/lang_cz.png";
import lang_en from "../images/lang/lang_en.png";
import lang_gr from "../images/lang/lang_gr.png";
import lang_pol from "../images/lang/lang_pol.png";
import lang_por from "../images/lang/lang_por.png";
import lang_ru from "../images/lang/lang_ru.png";
import lang_sp from "../images/lang/lang_sp.png";
import lang_multi from "../images/lang/lang_multi.png";

import population1 from './../images/population/population1.png';
import population2 from './../images/population/population2.png';
import population3 from './../images/population/population3.png';
import population4 from './../images/population/population4.png';

const lang_icons = [lang_cz, lang_en, lang_gr, lang_pol, lang_por, lang_ru, lang_sp, lang_multi];
const lang_names = ["Czech language", "English language", "Greek language", "Polish language", "Portuguese language", "Russian language", "Spanish language", "Multilingual"];

function Footer() {
  return (
    <div className="footer">
      {renderLanguages()}
      {renderPriorityMarkers()}
      {renderPopulation()}
      {renderAbout()}
    </div>
  );
}

function renderLanguages() {
  return (
    <div className="langLegend">
      {lang_icons.map((icon, idx) => {
        return <div className="langLegendItem" key={idx}>
          <img className="langLegendItemIcon" src={icon} alt={lang_names[idx]}/>
          <span style={{paddingLeft: 10}}>{lang_names[idx]}</span>
        </div>
      })}
    </div>
  );
}

function renderPriorityMarkers() {
  return (
    <div className="priorityMarkers">
      <table>
        <tbody>
        <tr style={{color: "#f700f7"}}>
          <th className="priorityMarkersLetters">PVP</th>
          <th className="priorityMarkersMeaning">"Player versus Player" oriented clan</th>
        </tr>
        <tr style={{color: "white"}}>
          <th className="priorityMarkersLetters">PVE</th>
          <th className="priorityMarkersMeaning">"Player versus environment" oriented clan</th>
        </tr>
        <tr style={{color: "red"}}>
          <th className="priorityMarkersLetters">PK</th>
          <th className="priorityMarkersMeaning">"Player killer" oriented clan</th>
        </tr>
        <tr style={{color: "white"}}>
          <th className="priorityMarkersLetters">AFK</th>
          <th className="priorityMarkersMeaning">"Away from keyboard" oriented clan (not very active)</th>
        </tr>
        <tr style={{color: "#00bc8c"}}>
          <th className="priorityMarkersLetters">Friendly</th>
          <th className="priorityMarkersMeaning">Peace-loving (without war, help beginners)</th>
        </tr>
        <tr>
          <th className="priorityMarkersLetters">Twinkies</th>
          <th className="priorityMarkersMeaning">Twinkies</th>
        </tr>
        <tr>
          <th className="priorityMarkersLetters">NS</th>
          <th className="priorityMarkersMeaning">Not specified (unknown)</th>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderPopulation() {
  return (
    <div className="populationLegend">
      <table>
        <tbody>
        <tr>
          <th><img src={population1} alt="1-10"/></th>
          <th className="populationMeaning">1-10 members</th>
        </tr>
        <tr>
          <th><img src={population2} alt="11-20"/></th>
          <th className="populationMeaning">11-20 members</th>
        </tr>
        <tr>
          <th><img src={population3} alt="21-30"/></th>
          <th className="populationMeaning">21-30 members</th>
        </tr>
        <tr>
          <th><img src={population4} alt="31-40"/></th>
          <th className="populationMeaning">31-40 members</th>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderAbout() {
  return (
    <div className="aboutLegend">
      <div>{"Discord: 5ergiu5#1092"}</div>
      <a href="elmorelab.com" className="aboutLink">{"elmorelab.com"}</a>
    </div>
  );

}

export default Footer;