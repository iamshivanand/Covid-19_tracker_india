import React from "react";
import "./App.css";
function Table(props) {
  //   console.log(props.data);
  var data = props.data;
  //   props.data.length && hello();
  //   function hello() {
  //     data = props.data;
  //   }
  //   console.log(data);
  var i = 0;
  return (
    <div className="state-wise-table">
      <div className="table">
        <div className="rows heading">
          <div className="state">STATE</div>
          <div className="confirmed">CONFIRMED</div>
          <div className="active">ACTIVE</div>
          <div className="recovered">RECOVERED</div>
          <div className="deceased">DECEASED</div>
        </div>

        {data.map((each) => (
          <div className="rows" key={i++}>
            <div className="state">{each.state}</div>
            <div className="confirmed">{each.confirmed}</div>
            <div className="active">{each.active}</div>
            <div className="recovered">{each.recovered}</div>
            <div className="deceased">{each.deaths}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
