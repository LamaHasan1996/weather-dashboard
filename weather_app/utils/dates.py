from datetime import datetime, timezone

ISO = "%Y-%m-%d %H:%M"

def now_iso() -> str:
    # Current Date in a Specific Format
    return datetime.now(timezone.utc).strftime(ISO)

def fmt_human(ts_utc: str) -> str:
    # Accept YYYY-MM-DD HH:MM" UTC format and return the same format
    return ts_utc
