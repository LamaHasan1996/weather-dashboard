class Forecast:
    """Represents current weather snapshot for a city."""
    def __init__(self, city: str, temp_c: float, wind_kmh: float | None, time_utc: str):
        self.city = city
        self.temp_c = temp_c
        self.wind_kmh = wind_kmh
        self.time_utc = time_utc

    def to_dict(self) -> dict:
        return {
            "city": self.city,
            "temp_c": self.temp_c,
            "wind_kmh": self.wind_kmh,
            "time_utc": self.time_utc,
        }

    @staticmethod
    def from_api(city: str, current: dict, time_utc: str) -> "Forecast":
        # Open-Meteo current_weather fields: temperature, windspeed
        temp = float(current.get("temperature"))
        wind = float(current.get("windspeed")) if current.get("windspeed") is not None else None
        return Forecast(city, temp, wind, time_utc)

    def __str__(self) -> str:
        w = f", wind {self.wind_kmh} km/h" if self.wind_kmh is not None else ""
        return f"{self.city}: {self.temp_c}°C{w} at {self.time_utc}"
