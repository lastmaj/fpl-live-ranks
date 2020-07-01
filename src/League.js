import React, { useState, useEffect } from "react";
import axios from "axios";

import Entry from "./Entry";

const League = (props) => {
  const cachedLeague = JSON.parse(sessionStorage.getItem("league"));

  const [name, setName] = useState(
    cachedLeague ? cachedLeague.league_name : "No league found!"
  );
  const [table, setTable] = useState([
    cachedLeague ? cachedLeague.league_table : [],
  ]);

  const [live, setLive] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("league")) {
      axios.get("/league").then((res) => {
        setName(res.data.league_name);
        sessionStorage.setItem("league", JSON.stringify(res.data));
      });
    }

    if (!sessionStorage.getItem("bootstrap")) {
      axios.get("/bootstrap").then((res) => {
        sessionStorage.setItem("elements", JSON.stringify(res.data.elements));
      });
    }
  }, []);

  useEffect(() => {
    axios.get("/live").then((res) => setLive(res.data));
  }, []);

  const entries = table[0].map((x, i) => {
    if (live.length !== 0) {
      x.picks.picks.forEach((p) => {
        const player = live.find((l) => l.id === p.element);
        p["total_points"] = player["total_points"];
      });
      return (
        <Entry
          name={x.entry_name}
          key={i}
          playerName={x.player_name}
          total={x.total}
          eventTotal={x.event_total}
          picks={x.picks.picks}
        />
      );
    }
  });

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Manager</th>
            <th>GW points</th>
            <th>Total</th>
            <th>Live</th>
          </tr>
        </thead>
        <tbody>{entries}</tbody>
      </table>
    </React.Fragment>
  );
};

export default League;
