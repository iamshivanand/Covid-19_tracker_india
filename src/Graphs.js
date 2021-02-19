import React, { useEffect, useState } from "react";
import "./App.css";
import { Doughnut, defaults, Line } from "react-chartjs-2";

defaults.global.legend.position = "bottom";
// defaults.global.tooltips.enabled=false;
defaults.global.legend.labels.boxWidth = 5;
defaults.global.legend.labels.fontSize = 10;

function Graphs(props) {
  var totalCasesToday = props.totalCasesToday;
  var confirmedCases = props.confirmedCases;
  var sevenDaysConfirmedCases = props.sevenDaysConfirmedCases;
  var sevenDaysDeceasedCases = props.sevenDaysDeceasedCases;
  var sevenDaysRecoveredCases = props.sevenDaysRecoveredCases;

  return (
    <div className="total-graph-container">
      <div className="doughnut-chart">
        <div className="confirmed-graph">
          <div className="total">Total</div>
          <div className="total-value">{confirmedCases}</div>
        </div>
        <Doughnut
          className="doughnut"
          data={{
            labels: [
              "active:" + totalCasesToday[0],
              "deceased:" + totalCasesToday[1],
              "recovered:" + totalCasesToday[2],
            ],
            datasets: [
              {
                data: totalCasesToday,
                backgroundColor: ["blue", "grey", "green"],
              },
            ],
          }}
          height={100}
          width={100}
          options={{
            maintainAspectRatio: false,
            cutoutPercentage: 80,
            tooltips: {
              enabled: false,
            },
          }}
        ></Doughnut>
      </div>
      <div className="line-chart">
        <Line
          data={{
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [
              {
                label: "confirmed",
                data: sevenDaysConfirmedCases,
                backgroundColor: "rgba(0, 0, 255, 0)",
                borderWidth: 2,
                borderColor: "rgba(255, 0, 0, 1)",
              },
              {
                label: "deceased",
                data: sevenDaysDeceasedCases,
                backgroundColor: "rgba(255,255,255,0)",
                borderWidth: 2,
                borderColor: "rgba(128, 128, 128, 1)",
              },
              {
                label: "recovered",
                data: sevenDaysRecoveredCases,
                backgroundColor: "rgba(0,255,0,0)",
                borderWidth: 2,
                borderColor: "rgba(0,255,0,1)",
              },
            ],
          }}
          height={100}
          width={100}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default Graphs;
