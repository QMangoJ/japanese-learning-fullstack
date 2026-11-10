#!/usr/bin/env python3
"""Fetch the per-user inputs for the unified vocab queue build.

Reads Daniel's app data straight from the app's Cloudflare KV namespace
(the HTTP API needs his browser session cookie; direct KV via the
custom.cloudflare connector token is the practical path — same approach as
~/workspace/japanese-learning-sync/sync.py). The Cloudflare token is injected
by the connector surrogate; this script never sees, prints or stores it.

Outputs (into scripts/vocab-queue-inputs/):
  favs.json       favourites object for the study account
  mistakes.json   mistakes array for the study account
  study-aids.json {sha256(sourceText): StudyAid} from mistake-study:v1:*

The study account is alanjwakawaka@gmail.com (holds all study data; his
danieljj2026 account is empty). The uid is found by matching the email
against the user:<uid> records, not hard-coded.

Usage: python3 scripts/fetch-vocab-queue-inputs.py
"""
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request

BASE = "https://api.cloudflare.com/client/v4"
ACCOUNT_ID = "247487e5bb3580a0727fd0d85dbc80e0"
NAMESPACE_ID = "dd867fe5aa004ac8b4b536f508a3530d"
STUDY_EMAIL = "alanjwakawaka@gmail.com"
OUT_DIR = Path(__file__).resolve().parent / "vocab-queue-inputs"


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        raise RuntimeError("redirect refused, verify the endpoint")


opener = urllib.request.build_opener(NoRedirect())


def _request(path):
    req = urllib.request.Request(BASE + path, method="GET")
    add_surrogate_to_request(req, "custom.cloudflare", allowed_hosts=["api.cloudflare.com"])
    return req


def get_value(key):
    path = (f"/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}"
            f"/values/{urllib.parse.quote(key, safe='')}")
    try:
        with opener.open(_request(path), timeout=60) as resp:
            return resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise


def list_keys(prefix):
    keys = []
    cursor = None
    while True:
        q = f"prefix={urllib.parse.quote(prefix)}&limit=1000"
        if cursor:
            q += f"&cursor={urllib.parse.quote(cursor)}"
        with opener.open(_request(f"/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}/keys?{q}"), timeout=60) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        keys += [item["name"] for item in payload.get("result") or []]
        info = payload.get("result_info") or {}
        if info.get("list_complete", True):
            return keys
        cursor = info.get("cursor")


def find_uid():
    for name in list_keys("user:"):
        raw = get_value(name)
        if not raw:
            continue
        record = json.loads(raw)
        if isinstance(record, dict) and record.get("email") == STUDY_EMAIL:
            return record["id"]
    raise SystemExit(f"no app user record for {STUDY_EMAIL}")


def main():
    uid = find_uid()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for label, key in [("favs", f"favs:{uid}"), ("mistakes", f"mistakes:{uid}")]:
        raw = get_value(key)
        if raw is None:
            raise SystemExit(f"KV key {key} not found")
        (OUT_DIR / f"{label}.json").write_text(raw)
        print(f"{label}: {len(raw)} bytes")
    aid_keys = list_keys("mistake-study:v1:")
    aids = {}

    def fetch(k):
        return k, get_value(k)

    with ThreadPoolExecutor(max_workers=16) as ex:
        for k, v in ex.map(fetch, aid_keys):
            if v:
                try:
                    aids[k.split("mistake-study:v1:", 1)[1]] = json.loads(v)
                except json.JSONDecodeError:
                    pass
    (OUT_DIR / "study-aids.json").write_text(json.dumps(aids, ensure_ascii=False))
    print(f"study-aids: {len(aids)} entries")


if __name__ == "__main__":
    main()
