from flask import Flask, jsonify
from funcs.live_bonus import live_bonus
from funcs.status import status
from funcs.get_league import get_league
from secret import *

import requests

app = Flask(__name__)


@app.route('/bonus')
def get_live_bonus():
    session = requests.Session()
    return live_bonus(session, 45)


@app.route('/status')
def get_status():
    session = requests.Session()
    return status(session)


# returns league standings with picks for every entry
@app.route('/league')
def league():
    session = requests.Session()
    return get_league(session, username, pw, league_id, 45)


@app.route('/bootstrap')
def get_bootstrap():
    session = requests.Session()
    bootstrap = session.get(
        'https://fantasy.premierleague.com/api/bootstrap-static/').json()
    return bootstrap


@app.route('/live')
def get_live(gw=45):
    session = requests.Session()
    live_json = session.get(
        "https://fantasy.premierleague.com/api/event/"+str(gw)+"/live/").json()["elements"]

    live = [{"id": x["id"], "total_points": x["stats"]["total_points"], "explain": x["explain"]}
            for x in live_json]

    return jsonify(live)


@app.route('/current')
def get_current():
    session = requests.Session()
    events = session.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/").json()["events"]
    current_event = next(
        event for event in events if event["is_current"] == True)
    return {'id': current_event["id"]}
