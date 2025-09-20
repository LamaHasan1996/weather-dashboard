import requests
from weather_app.models.forecast import Forecast
from weather_app.utils.dates import now_iso
from weather_app.utils.exceptions import NetworkError, NotFoundError

GEO_URL = "https://geocoding-api.open-meteo.com/v1/search"
FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

class WeatherClient:
    """Thin wrapper around Open-Meteo geocoding + forecast"""
    def __init__(self, lang: str = "en"):
        self.lang = lang

    def _geocode(self, city: str) -> tuple[float, float]:
        try:
            r = requests.get(GEO_URL, params={"name": city, "count": 1, "language": self.lang})
            r.raise_for_status()
            data = r.json()
            results = data.get("results") or []
            if not results:
                raise NotFoundError(f"City not found: {city}")
            lat = float(results[0]["latitude"])
            lon = float(results[0]["longitude"])
            return lat, lon
        except NotFoundError:
            raise
        except Exception as exc:
            raise NetworkError(f"Geocoding failed for {city}") from exc

    def current(self, city: str, units: str = "metric") -> Forecast:
        lat, lon = self._geocode(city)
        params = {
            "latitude": lat,
            "longitude": lon,
            "current_weather": "true",
        }
        # Open-Meteo uses metric by default; we keep °C
        try:
            r = requests.get(FORECAST_URL, params=params)
            r.raise_for_status()
            data = r.json()
            cur = data.get("current_weather")
            if not cur:
                raise NetworkError("No current_weather in response")
            return Forecast.from_api(city=city.title(), current=cur, time_utc=now_iso())
        except Exception as exc:
            raise NetworkError(f"Forecast failed for {city}") from exc
