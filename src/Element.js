import React from "react";

const Element = (props) => {
  const elements = JSON.parse(sessionStorage.getItem("elements"));

  const player = elements.filter((x) => x.id == props.id)[0];
  const pts = props.isCaptain ? props.total_points * 2 : props.total_points;

  return (
    <span className="element">
      {player.web_name} | {pts}
      {props.isCaptain ? " (c) " : null}
    </span>
  );
};

export default Element;
