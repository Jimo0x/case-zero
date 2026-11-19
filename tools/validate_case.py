"""Valide la cohérence d'une enquête (case.js) : identifiants, passages cliquables, solvabilité.

Usage : python tools/validate_case.py [case.js]
"""
import json
import re
import sys


def load(path):
    src = open(path, encoding="utf-8").read()
    body = src[src.index("{"): src.rindex("}") + 1]
    return json.loads(body)


def validate(case):
    errors, ids = [], set()

    def clue(c, where):
        if c["id"] in ids:
            errors.append(f"indice en double : {c['id']} ({where})")
        ids.add(c["id"])
        if "time" in c and not re.fullmatch(r"\d{2}:\d{2}", c["time"]):
            errors.append(f"heure invalide pour {c['id']} : {c['time']}")

    suspects = {s["id"] for s in case["suspects"]}
    for d in case["documents"]:
        for c in d["clues"]:
            clue(c, d["id"])
            if c["spot"] not in d["body"]:
                errors.append(f"le passage « {c['spot']} » de {c['id']} est absent du document {d['id']}")
    for ch in case["chats"]:
        for who, t, _ in ch["messages"]:
            if who not in suspects:
                errors.append(f"auteur inconnu dans {ch['id']} : {who}")
        for c in ch["clues"]:
            clue(c, ch["id"])
            if not 0 <= c["msg"] < len(ch["messages"]):
                errors.append(f"{c['id']} pointe vers un message inexistant")
    for p in case["photos"]:
        for h in p["hotspots"]:
            clue(h["clue"], p["id"])
            if not (0 <= h["x"] <= 1 and 0 <= h["y"] <= 1):
                errors.append(f"zone hors image dans {p['id']}")
    sol = case["solution"]
    if sol["culprit"] not in suspects:
        errors.append("le coupable n'est pas un suspect")
    if sol["method"] not in {m["id"] for m in sol["methods"]}:
        errors.append("la méthode de la solution n'existe pas")
    for p in sol["proof"]:
        if p not in ids:
            errors.append(f"preuve introuvable dans le jeu : {p}")
    if len(sol["proof"]) != 2:
        errors.append("la solution doit exiger exactement deux preuves")
    return errors, ids


if __name__ == "__main__":
    case = load(sys.argv[1] if len(sys.argv) > 1 else "case.js")
    errs, ids = validate(case)
    print(f"{case['title']} — {len(case['suspects'])} suspects, {len(ids)} indices")
    for e in errs:
        print("  ✗", e)
    print("✓ enquête valide et solvable" if not errs else f"{len(errs)} erreur(s)")
    sys.exit(1 if errs else 0)
