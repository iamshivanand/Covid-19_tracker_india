import React from "react";
import "./App.css";
import IndiaMap from "./IndiaMap";
function Map(props) {
  var totalCases = props.totalCases;

  var statewise = props.statewise;
  return (
    <div className="indian-map">
      <div className="boxes-div">
        <div className="confirmed-box">
          <div className="box-heading">CONFIRMED</div>
          <div className="box-value">{totalCases.confirmed}</div>
        </div>
        <div className="active-box">
          <div className="box-heading">ACTIVE</div>
          <div className="box-value">{totalCases.active}</div>
        </div>
        <div className="recovered-box">
          <div className="box-heading">RECOVERED</div>
          <div className="box-value">{totalCases.recovered}</div>
        </div>
        <div className="deceased-box">
          <div className="box-heading">DECEASED</div>
          <div className="box-value">{totalCases.deaths}</div>
        </div>
      </div>

      <IndiaMap statewise={statewise}/>
    </div>
  );
}

export default Map;
