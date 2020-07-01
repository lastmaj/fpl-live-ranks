import React, { useState, useEffect, memo } from "react";

import Element from "./Element";

const Entry = (props) => {
  const [showPicks, setShowPicks] = useState(false);
  const [picks, setPicks] = useState(props.picks);

  const onClickHandler = () => {
    setShowPicks(!showPicks);
  };

  const elements = props.picks.map((x, i) => (
    <Element
      key={i}
      id={x.element}
      total_points={x.total_points}
      isCaptain={x.is_captain}
      isVice={x.is_vice_captain}
    />
  ));

  const liveTotal = props.picks.reduce((acc, curr) => {
    return acc + curr.total_points * curr.multiplier;
  }, 0);

  return (
    <React.Fragment>
      <tr onClick={onClickHandler}>
        <td>{props.name}</td>
        <td>{props.playerName}</td>
        <td>{props.eventTotal}</td>
        <td>{props.total}</td>
        <td>{liveTotal}</td>
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
