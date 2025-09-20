export async function fetchCities() {
  const r = await fetch(`/api/cities`);
  return r.json();
}
export async function addCity(name) {
  const r = await fetch(`/api/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return r.json();
}
export async function removeCity(name) {
  const u = new URL(`/api/cities`, window.location.origin);
  u.pathname = "/api/cities";
  u.searchParams.set("name", name);
  const r = await fetch(u, { method: "DELETE" });
  return r.json();
}
export async function getCurrent(city) {
  const r = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  return r.json(); // {city,temp_c,wind_kmh,time_utc}
}

// Direct Open-Meteo for 5-day forecast (no key)
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function geocode(city) {
  const r = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en`
  );
  const d = await r.json();
  if (!d?.results?.length) throw new Error("City not found");
  const { latitude, longitude } = d.results[0];
  return { lat: latitude, lon: longitude };
}

export async function getForecast5d(city) {
  const { lat, lon } = await geocode(city);
  const q = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone: "auto",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
  });
  const r = await fetch(`${FORECAST_URL}?${q}`);
  const d = await r.json();
  const n = d?.daily?.time?.length || 0,
    out = [];
  for (let i = 0; i < Math.min(n, 5); i++) {
    out.push({
      date: d.daily.time[i],
      tmax: d.daily.temperature_2m_max[i],
      tmin: d.daily.temperature_2m_min[i],
      precip: d.daily.precipitation_sum[i],
      windmax: d.daily.wind_speed_10m_max[i],
    });
  }
  return out;
}
