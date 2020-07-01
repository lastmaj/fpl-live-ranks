def status(session):

    bootstrap_url = "https://fantasy.premierleague.com/api/bootstrap-static/"

    events = session.get(
        bootstrap_url).json()["events"]

    current_event = next(
        event for event in events if event["is_current"] == True)

    id = str(current_event["id"])

    if current_event["finished"]:
        if current_event["data_checked"]:
            # nothing to be done
            return "nothing"

    else:
        fixtures_url = "https://fantasy.premierleague.com/api/fixtures/?event=" + \
            str(id)
        fixtures = session.get(fixtures_url).json()

        if any(f["finished_provisional"] == False for f in fixtures):
            # games are currently not finished_provisional
            return "live"

        else:
            # games are finished_provisional
            return "finished_provisional"
