from functools import reduce
from flask import jsonify


def sort_bps(fixture):
    # takes a dict of fixture, and return 4 elements with most bps
    # returns a dict
    x = fixture['bps'][0]
    top_bps = x['a'][:4] + x['h'][:4]
    bps_sorted = sorted(top_bps, key=lambda i: i['value'], reverse=True)[:4]
    return bps_sorted
# helper func


def bps_to_bonus(f):
    # looks at list of top 4 bps, and converts into a list

    # if first=second :
    if f[0]['value'] == f[1]['value']:
        f[0]['value'] = 3
        f[1]['value'] = 3
        f[2]['value'] = 1
        f.pop()
    # if second=third
    elif f[1]['value'] == f[2]['value']:
        f[0]['value'] = 3
        f[1]['value'] = 2
        f[2]['value'] = 2
        f.pop()
    # if third=fourth
    elif f[2]['value'] == f[3]['value']:
        f[0]['value'] = 3
        f[1]['value'] = 2
        f[2]['value'] = 1
        f[3]['value'] = 1
    # else normal case
    else:
        f[0]['value'] = 3
        f[1]['value'] = 2
        f[2]['value'] = 1
        f.pop()
    return f
# helper func


def live_bonus(session, gw):
    endpoint_fixtures = 'https://fantasy.premierleague.com/api/fixtures/?event=' + \
        str(gw)
    fixtures_json = session.get(endpoint_fixtures).json()
    # filters concerned fixtures (currently playing)
    fixtures = [x for x in fixtures_json if (
        x['started'] and not x['finished'])]
    # drop unnecessary attributes from dicts
    fixtures = [{'id': x["id"], 'bps': [y for y in x['stats']
                                        if y['identifier'] == 'bps']} for x in fixtures]
    # appends top 4 bps to each fixture
    fixtures_bps = [sort_bps(x) for x in fixtures]
    # calculates projected bonus
    fixtures_bonus = [bps_to_bonus(x) for x in fixtures_bps]
    # flattens array
    return jsonify(reduce(lambda x, y: x+y, fixtures_bonus, []))
# main func for live bps_to_bonus conversion, returns a list of dicts