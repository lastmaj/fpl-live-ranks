
def get_league(session, username, pw, league_id, gw):
    base_url = "https://fantasy.premierleague.com/api/"

    payload = {"login": username, "password": pw,
               "app": "plfpl-web", "redirect_uri": "https://fantasy.premierleague.com/"}

    session.post(
        "https://users.premierleague.com/accounts/login/", data=payload)
    league_json = session.get(
        base_url+"/leagues-classic/"+str(league_id)+"/standings/").json()
    league_table = league_json["standings"]["results"]
    league_name = league_json["league"]["name"]

    for entry in league_table:
        picks_url = base_url + "entry/" + \
            str(entry["entry"])+"/event/" + str(gw) + "/picks/"
        picks_json = session.get(picks_url).json()
        history_url = base_url + "entry/" + str(entry["entry"]) + "/history/"

        history_json = session.get(history_url).json()["current"]

        entry["history_total"] = history_json[-2]["total_points"]
        entry["event_transfers_cost"] = history_json[-1]["event_transfers_cost"]
        entry["picks"] = picks_json["picks"]
        entry["history"] = picks_json["entry_history"]

    return {'league_name': league_name, 'league_table': league_table}
