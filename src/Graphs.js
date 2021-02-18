import React from "react";
import "./App.css";
import { Doughnut, defaults, Line } from "react-chartjs-2";

defaults.global.legend.position = "bottom";
// defaults.global.tooltips.enabled=false;
defaults.global.legend.labels.boxWidth = 5;
defaults.global.legend.labels.fontSize = 10;

function Graphs(props) {
  var totalCasesToday = props.totalCasesToday;
  //   console.log(totalCasesToday);

  return (
    <div className="total-graph-container">
      <div className="doughnut-chart">
        <Doughnut
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
        />
      </div>
      <div className="line-chart">
        <Line
          data={{
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [
              {
                label: "active",
                data: [12, 3, 14, 12, 15, 1, 9],
                backgroundColor: "rgba(0, 0, 255, 0)",
                borderWidth: 2,
                borderColor: "rgba(0, 0, 255, 1)",
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
