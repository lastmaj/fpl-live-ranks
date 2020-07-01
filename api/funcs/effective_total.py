from status import status


def effective_total(session, entries):
    if status(session) == "finished_provisional":
        # 1. total (league endpoint)!== total (entry endpoint): obsolete
        # 2. total (league endpoint)!== total (old + live)

        # => total (league) !== total (old live)
        # for entry in entries:
        return


def substract_then_add(entry, total):
    entry_endpoint = "https://fantasy.premierleague.com/api/entry/"+entry+"/history/"
