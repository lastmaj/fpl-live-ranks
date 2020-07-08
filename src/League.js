import React, { useState, useEffect } from "react";
import axios from "axios";

import Entry from "./Entry";

const League = (props) => {
  const cachedLeague = JSON.parse(sessionStorage.getItem("league"));

  const [name, setName] = useState(
    cachedLeague ? cachedLeague.league_name : "No league found!"
  );
  const [table, setTable] = useState(
    cachedLeague ? cachedLeague.league_table : []
  );

  const [live, setLive] = useState([]);
  const [bonus, setBonus] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("league")) {
      axios.get("/league").then((res) => {
        setName(res.data.league_name);
        sessionStorage.setItem("league", JSON.stringify(res.data));
      });
    }

    if (!sessionStorage.getItem("elements")) {
      axios.get("/bootstrap").then((res) => {
        sessionStorage.setItem("elements", JSON.stringify(res.data.elements));
      });
    }

    if (!sessionStorage.getItem("current")) {
      axios
        .get("/current")
        .then((res) => sessionStorage.setItem("current", res.data.id));
    }
  }, []);

  useEffect(() => {
    axios.get("/live").then((res) => setLive(res.data));
    axios.get("/bonus").then((res) => setBonus(res.data));
  }, []);

  const entries = table.map((x, i) => {
    if (live.length !== 0) {
      x.picks.forEach((p) => {
        const player = live.find((l) => l.id === p.element);
        const player_bonus = bonus.find((l) => l.element === p.element);
        p["total_points"] = player["total_points"];
        if (player_bonus !== undefined) {
          p["projected"] = player_bonus["value"];
        }
      });
      return (
        <Entry
          name={x.entry_name}
          key={i}
          playerName={x.player_name}
          total={x.total}
          eventTotal={x.event_total}
          picks={x.picks}
          history={x.history}
        />
      );
    }
    return null;
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
            <th>Transfers cost</th>
            <th>Total</th>
            <th>Live</th>
            <th>Real Total</th>
          </tr>
        </thead>
        <tbody>{entries}</tbody>
      </table>
    </React.Fragment>
  );
};

export default League;
