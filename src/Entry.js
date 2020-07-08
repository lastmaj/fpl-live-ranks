import React, { useState } from "react";

import Element from "./Element";

const Entry = (props) => {
  const [showPicks, setShowPicks] = useState(false);

  const onClickHandler = () => {
    setShowPicks(!showPicks);
  };

  const elements = props.picks.map((x, i) => (
    <Element
      key={i}
      id={x.element}
      total_points={x.total_points + (x.projected ? x.projected : 0)}
      isCaptain={x.is_captain}
      isVice={x.is_vice_captain}
    />
  ));

  const liveTotal = props.picks.reduce((acc, curr) => {
    const total = curr.total_points + (curr.projected ? curr.projected : 0);
    return acc + total * curr.multiplier;
  }, 0);

  //update logic
  let realTotal = props.total;
  if (props.history.event === parseInt(sessionStorage.getItem("current"))) {
    if (props.history.points !== liveTotal) {
      console.log("here");
      realTotal = props.history.total_points + liveTotal - props.history.points;
    }
  }

  return (
    <React.Fragment>
      <tr onClick={onClickHandler}>
        <td>{props.name}</td>
        <td>{props.playerName}</td>
        <td>{props.eventTotal}</td>
        <td>{props.history.event_transfers_cost}</td>
        <td>{props.total}</td>
        <td>{liveTotal}</td>
        <td>{realTotal}</td>
      </tr>
      <tr>
        <td
          className="team"
          style={{ display: showPicks ? "table-row" : "none" }}
        >
          {elements}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Entry;
