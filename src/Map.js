import React, { useState } from "react";
import "./App.css";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import India_Topo_Json from "./IndiaTopo.json";
import ReactTooltip from "react-tooltip";

const Projection_Config = {
  scale: 600,
  center: [78.9629, 22.5937],
};
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "red",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

function Map(props) {
  var totalCases = props.totalCases;
  var statewise = props.statewise;

  var statewise = props.statewise;
  var data = [];
  //function for the data
  statewise.map((each) => {
    if (each.statecode != "TT" && each.statecode != "UN") {
      data = [
        ...data,
        {
          id: each.statecode,
          state: each.state,
          value: each.active,
        },
      ];
    }
  });
  //   console.log(data);

  const [tooltipContent, setTooltipContent] = useState("");
  const [cases, setCases] = useState(totalCases);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}:${current.value}`);
      
      statewise.map((each) => {
        if (each.statecode === current.id) {
          //   console.log(each);
          setCases(each);
        }
      });
    };
  };
  const onMouseLeave = () => {
    setTooltipContent("");
    setCases(totalCases);
  };

  const colorScale= scaleQuantile().domain(data.map(d=>d.value)).range(COLOR_RANGE);
  
  var arrayData = [
    {
      value: "0",
    },
  ];

  return (
    <div className="indian-map">
      <div className="boxes-div">
        <div className="confirmed-box">
          <div className="box-heading">CONFIRMED</div>
          <div className="box-value">{cases.confirmed}</div>
        </div>
        <div className="active-box">
          <div className="box-heading">ACTIVE</div>
          <div className="box-value">{cases.active}</div>
        </div>
        <div className="recovered-box">
          <div className="box-heading">RECOVERED</div>
          <div className="box-value">{cases.recovered}</div>
        </div>
        <div className="deceased-box">
          <div className="box-heading">DECEASED</div>
          <div className="box-value">{cases.deaths}</div>
        </div>
      </div>

      <div className="map">
        <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={Projection_Config}
          projection="geoMercator"
          width={400}
          height={350}
          data-tip=""
        >
          <Geographies geography={India_Topo_Json}>
            {({ geographies }) =>
              geographies.map((geo) => {
                var current = data.find((s) => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : "lightgrey"}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;
