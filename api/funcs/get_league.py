
def get_league(session, username, pw, league_id):
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
            str(entry["entry"])+"/event/41/picks/"
        entry["picks"] = session.get(picks_url).json()
    return {'league_name': league_name, 'league_table': league_table}
