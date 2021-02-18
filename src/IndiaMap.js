import React, { useState } from "react";
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
function IndiaMap(props) {
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

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}:${current.value}`);
    };
  };
  const onMouseLeave = () => {
    setTooltipContent("");
  };

  function colorScale(data) {
    scaleQuantile().domain(data).range("white", "red");
  }

  //   function onMouseEnter() {}
  //   function onMouseLeave() {}
  return (
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
              const current = data.find((s) => s.id === geo.id);
              console.log(geo);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : "grey"}
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
  );
}

export default IndiaMap;
