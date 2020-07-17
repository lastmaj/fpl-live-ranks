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
  let arrowStyle = "arrow";

  if (props.lastRank > props.rank) {
    arrow = ArrowUp;
    arrowStyle += " green";
  }
  if (props.lastRank < props.rank) {
    arrow = ArrowDown;
    arrowStyle += " red";
    console.log(arrowStyle);
  }

  return (
    <React.Fragment>
      <tr onClick={onClickHandler}>
        <td>
          <img className={arrowStyle} src={arrow} alt="movement" />
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
          colSpan={"7"}
          className="team"
          style={{ display: showPicks ? "table-cell" : "none" }}
        >
          {elements}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Entry;
