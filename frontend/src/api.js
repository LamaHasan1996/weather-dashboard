function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(resource, { ...rest, signal: controller.signal }).finally(() =>
    clearTimeout(id)
  );
}

async function toJson(res) {
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  return text ? JSON.parse(text) : null;
}

export async function fetchCities() {
  const r = await fetchWithTimeout(`/api/cities`);
  return toJson(r);
}

export async function addCity(name) {
  const r = await fetchWithTimeout(`/api/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return toJson(r);
}

export async function removeCity(name) {
  const u = new URL(`/api/cities`, window.location.origin);
  u.searchParams.set("name", name);
  const r = await fetch(u, { method: "DELETE" });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function getCurrent(city) {
  const r = await fetchWithTimeout(
    `/api/weather?city=${encodeURIComponent(city)}`
  );
  return toJson(r);
}

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function geocode(city) {
  const r = await fetchWithTimeout(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en`
  );
  const d = await toJson(r);
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
  const r = await fetchWithTimeout(`${FORECAST_URL}?${q.toString()}`);
  const d = await toJson(r);
  const n = d?.daily?.time?.length || 0;
  const out = [];
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
