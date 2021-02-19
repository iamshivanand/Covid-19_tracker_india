import React from "react";
import "./App.css";
function Table(props) {
  //   console.log(props.data);
  var data = props.data;

  //   console.log(props.handleMouseHover);
  //   props.data.length && hello();
  //   function hello() {
  //     data = props.data;
  //   }
  //   console.log(data);

  //   const onMouseEnter = (event) => {
  //     // console.log(event.currentTarget.dataset.info);
  //     var value=event.currentTarget.dataset.info;
  //     value=JSON.parse(value);
  //     console.log(value);
  //     // console.log(JSON.parse(event.target.dataset.info));
  //   };
  var i = 0;
  return (
    <div className="state-wise-table">
      <div className="table">
        <div className="rows heading">
          <div className="state heading">STATE</div>
          <div className="confirmed heading">CONFIRMED</div>
          <div className="active heading">ACTIVE</div>
          <div className="recovered heading">RECOVERED</div>
          <div className="deceased heading">DECEASED</div>
        </div>

        {data.map((each) => (
          <div
            className="rows"
            key={i++}
            data-info={JSON.stringify(each)}
            onMouseEnter={props.handleMouseEnter}
            onMouseLeave={props.handleMouseLeave}
          >
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
