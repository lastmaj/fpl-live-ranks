import React, { useState } from "react";

import ArrowUp from "./arrow-up.svg";
import ArrowDown from "./arrow-down.svg";
import ArrowSame from "./arrow-same.svg";

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
      total_points={x.total_points}
      isCaptain={x.is_captain}
      isVice={x.is_vice_captain}
    />
  ));

  let arrow = ArrowSame;

  if (props.lastRank < props.rank) {
    arrow = ArrowUp;
  }
  if (props.lastRank > props.rank) {
    arrow = ArrowDown;
  }

  return (
    <React.Fragment>
      <tr onClick={onClickHandler}>
        <td>
          <span>
            <img src={arrow} alt="movement" />
          </span>
          {props.name}
        </td>
        <td>{props.playerName}</td>
        <td>{props.eventTotal}</td>
        <td>{props.history.event_transfers_cost}</td>
        <td>{props.total}</td>
        <td>{props.liveTotal}</td>
        <td>{props.realTotal}</td>
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
