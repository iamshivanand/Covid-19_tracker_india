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
  // const [casesTimeSeries, setCasesTimeSeries] = useState([]);
  const [statesDaily, setStatesDaily] = useState([]);

  useEffect(() => {
    fetch(api1)
      .then((res) => res.json())
      .then((json) => {
        setStatesDaily(json.states_daily);
      });

    fetch(api2)
      .then((res) => res.json())
      .then((json) => {
        // var cases_time_series = json.cases_time_series;
        // setCasesTimeSeries(cases_time_series);
        var statewise = json.statewise;
        // statewise.map((each) => {
        //   if (each.state === "Total") {
        //     setTotalCases(each);
        //   }
        setTotalCases(statewise[0]);
          setStateWise(statewise);
        // });
      });
    // console.log(totalCases);
  }, []);
  function totalCasesData(cases) {
    var totalCasesToday = [cases.active, cases.deaths, cases.recovered];
    return totalCasesToday;
  }
  var totalCasesToday = totalCasesData(totalCases);
  // console.log(totalCasesToday);

  //finding the data for the last seven days for total india
  var todayIndex = statesDaily.findIndex((x) => x.dateymd === today);

  function sevenDaysFun() {
    return {
      day1: {
        confirmed: statesDaily[todayIndex],
        deceased: statesDaily[todayIndex - 1],
        recovered: statesDaily[todayIndex - 2],
      },
      day2: {
        confirmed: statesDaily[todayIndex - 3],
        deceased: statesDaily[todayIndex - 4],
        recovered: statesDaily[todayIndex - 5],
      },
      day3: {
        confirmed: statesDaily[todayIndex - 6],
        deceased: statesDaily[todayIndex - 7],
        recovered: statesDaily[todayIndex - 8],
      },
      day4: {
        confirmed: statesDaily[todayIndex - 9],
        deceased: statesDaily[todayIndex - 10],
        recovered: statesDaily[todayIndex - 11],
      },
      day5: {
        confirmed: statesDaily[todayIndex - 12],
        deceased: statesDaily[todayIndex - 13],
        recovered: statesDaily[todayIndex - 14],
      },
      day6: {
        confirmed: statesDaily[todayIndex - 15],
        deceased: statesDaily[todayIndex - 16],
        recovered: statesDaily[todayIndex - 17],
      },
      day7: {
        confirmed: statesDaily[todayIndex - 18],
        deceased: statesDaily[todayIndex - 19],
        recovered: statesDaily[todayIndex - 20],
      },
    };
  }

  function findSevenDaysData(state) {
    var sevenDays = sevenDaysFun();
    var sevenDaysAll = {
      confirmedSevenDays: [
        sevenDays.day1.confirmed.state,
        sevenDays.day2.confirmed.state,
        sevenDays.day3.confirmed.state,
        sevenDays.day4.confirmed.state,
        sevenDays.day5.confirmed.state,
        sevenDays.day6.confirmed.state,
        sevenDays.day7.confirmed.state,
      ],
      deceasedSevenDays: [
        sevenDays.day1.deceased.state,
        sevenDays.day2.deceased.state,
        sevenDays.day3.deceased.state,
        sevenDays.day4.deceased.state,
        sevenDays.day5.deceased.state,
        sevenDays.day6.deceased.state,
        sevenDays.day7.deceased.state,
      ],
      recoveredSevenDays: [
        sevenDays.day1.recovered.state,
        sevenDays.day2.recovered.state,
        sevenDays.day3.recovered.state,
        sevenDays.day4.recovered.state,
        sevenDays.day5.recovered.state,
        sevenDays.day6.recovered.state,
        sevenDays.day7.recovered.state,
      ],
    };
    return sevenDaysAll;
  }
  // console.log(findSevenDaysData("tt"));
  // console.log(totalCases);
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
        <Graphs totalCasesToday={totalCasesToday} />
        <Table data={statewise} />
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
