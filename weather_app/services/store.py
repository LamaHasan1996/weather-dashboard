import json
from json import JSONDecodeError
from pathlib import Path
from typing import Iterable
from weather_app.models.forecast import Forecast
from weather_app.utils.exceptions import StorageError

BASE_DIR = Path(__file__).resolve().parents[1].parent  # project root
DATA_DIR = BASE_DIR / "data"
CITIES_PATH = DATA_DIR / "cities.json"
CACHE_PATH = DATA_DIR / "cache.json"

class CityStore:
    """Stores favorite cities in JSON: ["Berlin", "Potsdam"]"""
    def __init__(self, path: Path = CITIES_PATH):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def load(self) -> list[str]:
        if not self.path.exists():
            return []
        try:
            text = self.path.read_text(encoding="utf-8").strip()
            if not text:
                return []
            data = json.loads(text)
            return list(data) if isinstance(data, list) else []
        except (OSError, JSONDecodeError) as _:
            return []
        except Exception as exc:
            raise StorageError(f"Failed to read {self.path}") from exc

    def save(self, cities: Iterable[str]) -> None:
        try:
            self.path.write_text(
                json.dumps(list(cities), ensure_ascii=False, indent=2),
                encoding="utf-8"
            )
        except Exception as exc:
            raise StorageError(f"Failed to write {self.path}") from exc

class CacheStore:
    """Caches last fetched forecasts by city."""
    def __init__(self, path: Path = CACHE_PATH):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def load(self) -> dict:
        if not self.path.exists():
            return {}
        try:
            text = self.path.read_text(encoding="utf-8").strip()
            return json.loads(text) if text else {}
        except (OSError, JSONDecodeError) as _:
            return {}
        except Exception as exc:
            raise StorageError(f"Failed to read {self.path}") from exc

    def save_snapshot(self, forecast: Forecast) -> None:
        try:
            cache = self.load()
            cache[forecast.city.lower()] = forecast.to_dict()
            self.path.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception as exc:
            raise StorageError(f"Failed to write {self.path}") from exc
