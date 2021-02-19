import React, { useEffect, useState } from "react";
import "./App.css";
import Graphs from "./Graphs";
import Table from "./Table";
import Map from "./Map";

function App() {
  var today = new Date();
  var dd = String(today.getDate() - 1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  // console.log(today);

  const api1 = "https://api.covid19india.org/states_daily.json";
  const api2 = "https://api.covid19india.org/data.json";

  const [totalCases, setTotalCases] = useState([]);
  const [statewise, setStateWise] = useState([]);
  const [statesDaily, setStatesDaily] = useState([]);
  const [CasesToday, setCasesTOday] = useState([]);
  const [confirmedCases, setConfirmedCases] = useState([]);
  var [sevenDaysConfirmedCases, setSevenDaysConfirmedCases] = useState([]);
  var [sevenDaysDeceasedCases, setSevenDaysDeceasedCases] = useState([]);
  var [sevenDaysRecoveredCases, setSevenDaysRecoveredCases] = useState([]);

  useEffect(() => {
    fetch(api1)
      .then((res) => res.json())
      .then((json) => {
        setStatesDaily(json.states_daily);
      });

    fetch(api2)
      .then((res) => res.json())
      .then((json) => {
        var statewise = json.statewise;
        setTotalCases(statewise[0]);
        setStateWise(statewise);
        var todayCases = [
          totalCases.active,
          totalCases.deaths,
          totalCases.recovered,
        ];
        setCasesTOday(todayCases);
      });
  }, []);

  function totalCasesData(cases) {
    var casesToday = [cases.active, cases.deaths, cases.recovered];
    return casesToday;
  }
  function totalConfirmedCases(cases) {
    setConfirmedCases(cases.confirmed);
  }

  //finding the data for the last seven days for total india
  var todayIndex = statesDaily.findIndex((x) => x.dateymd === today);

  function sevenDaysConfirmedData(stateCode) {
    console.log(stateCode);
    var data = [
      statesDaily[todayIndex - 18][stateCode],
      statesDaily[todayIndex - 15][stateCode],
      statesDaily[todayIndex - 12][stateCode],
      statesDaily[todayIndex - 9][stateCode],
      statesDaily[todayIndex - 6][stateCode],
      statesDaily[todayIndex - 3][stateCode],
      statesDaily[todayIndex][stateCode],
    ];
    setSevenDaysConfirmedCases(data);
  }

  // var stateCode = "tt";
  // var sevenDaysConfirmedCases = sevenDaysConfirmedData(stateCode);

  // console.log(sevenDaysConfirmedCases);

  function sevenDaysDeceasedData(stateCode) {
    var data = [
      statesDaily[todayIndex - 19][stateCode],
      statesDaily[todayIndex - 16][stateCode],
      statesDaily[todayIndex - 13][stateCode],
      statesDaily[todayIndex - 10][stateCode],
      statesDaily[todayIndex - 7][stateCode],
      statesDaily[todayIndex - 4][stateCode],
      statesDaily[todayIndex - 1][stateCode],
    ];
    setSevenDaysDeceasedCases(data);
  }
  // var sevenDaysDeceasedCases = sevenDaysDeceasedData(stateCode);
  function sevenDaysRecoveredData(stateCode) {
    var data = [
      statesDaily[todayIndex - 20][stateCode],
      statesDaily[todayIndex - 17][stateCode],
      statesDaily[todayIndex - 14][stateCode],
      statesDaily[todayIndex - 11][stateCode],
      statesDaily[todayIndex - 8][stateCode],
      statesDaily[todayIndex - 5][stateCode],
      statesDaily[todayIndex - 2][stateCode],
    ];
    setSevenDaysRecoveredCases(data);
  }
  // var sevenDaysRecoveredCases = sevenDaysRecoveredData(stateCode);

  function handleMouseEnter(event) {
    var cases = event.currentTarget.dataset.info;
    cases = JSON.parse(cases);
    var newCase = totalCasesData(cases);
    setCasesTOday(newCase);
    totalConfirmedCases(cases);
    var stateCode = cases.statecode.toLowerCase();
    sevenDaysConfirmedData(stateCode);
    sevenDaysDeceasedData(stateCode);
    sevenDaysRecoveredData(stateCode);
  }
  function handleMouseLeave(event) {
    setCasesTOday([totalCases.active, totalCases.deaths, totalCases.recovered]);
    totalConfirmedCases(totalCases);
  }

  return (
    <div className="App">
      <div className="left-container">
        <div className="upper-left-container">
          <h4>INDIA COVID-19 Tracker</h4>
          <p>
            Let's pray to make our Earth Covid-19 free soon,Stay Safe and do The
            Locate.
          </p>
        </div>
        <Graphs
          totalCasesToday={CasesToday}
          confirmedCases={confirmedCases}
          sevenDaysConfirmedCases={sevenDaysConfirmedCases}
          sevenDaysDeceasedCases={sevenDaysDeceasedCases}
          sevenDaysRecoveredCases={sevenDaysRecoveredCases}
        />
        <Table
          data={statewise}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
      <div className="right-container">
        <div className="upper-right-container">
          <h4>INDIA MAP</h4>
          <p>HOVER OVER STATES FOR MORE DETAILS </p>
        </div>
        <Map totalCases={totalCases} statewise={statewise} />
      </div>
    </div>
  );
}

export default App;
